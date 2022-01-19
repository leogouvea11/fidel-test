import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { getErrorResponse } from '@libs/errorResponse'
import { middyfy } from '@libs/lambda'
import { DynamoDB } from 'aws-sdk'
import * as uuid from 'uuid'

import { addNewLocationToOfferByBrandIdSchema, addNewLocationToOfferByLocationIdSchema, createNewOfferSchema, getOfferByIdSchema } from './schemas'

const dynamoDB = new DynamoDB.DocumentClient()

const getOfferByIdHandler: ValidatedEventAPIGatewayProxyEvent<typeof getOfferByIdSchema> = async (event) => {
  try {
    const offer = await dynamoDB.get({
      TableName: 'offers-fidel',
      Key: {
        id: event.body.id
      }
    }).promise()

    if (!offer) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `Could not find offer ${event.body.id}`
        })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(offer.Item)
    }
  } catch (err) {
    return getErrorResponse(err)
  }
}

const createNewOfferHandler: ValidatedEventAPIGatewayProxyEvent<typeof createNewOfferSchema> = async (event) => {
  try {
    const newOffer = {
      id: uuid.v1(),
      name: event.body.name,
      brandId: event.body.brandId,
      locationsTotal: 0
    }

    await dynamoDB.put({
      TableName: 'offers-fidel',
      Item: newOffer
    }).promise()

    return formatJSONResponse({
      message: 'New offer created sucessfully!',
      offer: newOffer
    })
  } catch (err) {
    return getErrorResponse(err)
  }
}

const addNewLocationToOfferBylocationIdHandler: ValidatedEventAPIGatewayProxyEvent<typeof addNewLocationToOfferByLocationIdSchema> = async (event) => {
  try {
    const offer = await dynamoDB.get({
      TableName: 'offers-fidel',
      Key: {
        id: event.body.id
      }
    }).promise()

    const [updatedOffer, _] = await Promise.all([
      dynamoDB.update({
        TableName: 'offers-fidel',
        Key: {
          id: event.body.id,
        },
        UpdateExpression: 'set locationsTotal = :r',
        ExpressionAttributeValues: {
          ':r': Number(offer.Item.locationsTotal) + 1,
        },
        ReturnValues: 'UPDATED_NEW'
      }).promise(),
      await dynamoDB.update({
        TableName: 'locations-fidel',
        Key: {
          id: event.body.locationId
        },
        UpdateExpression: 'set hasOffer = :r',
        ExpressionAttributeValues: {
          ':r': true,
        },
        ReturnValues: 'UPDATED_NEW'
      }).promise()
    ])

    return {
      statusCode: 200,
      body: JSON.stringify(updatedOffer)
    }
  } catch (err) {
    return getErrorResponse(err)
  }
}

const addNewLocationToOfferByBrandIdHandler: ValidatedEventAPIGatewayProxyEvent<typeof addNewLocationToOfferByBrandIdSchema> = async (event) => {
  try {
    const offer = await dynamoDB.get({
      TableName: 'offers-fidel',
      Key: {
        id: event.body.id
      }
    }).promise()

    const updatedLocation = await dynamoDB.update({
      TableName: 'locations-fidel',
      Key: {
        brandId: event.body.brandId
      },
      UpdateExpression: 'set hasOffer = :r',
      ExpressionAttributeValues: {
        ':r': true,
      },
      ReturnValues: 'UPDATED_NEW'
    }).promise()

    const updatedOffer = await dynamoDB.update({
        TableName: 'offers-fidel',
        Key: {
          id: event.body.id,
        },
        UpdateExpression: 'set locationsTotal = :r',
        ExpressionAttributeValues: {
          ':r': Number(offer.Item.locationsTotal) + Number(offer.Item.locationsTotal),
        },
        ReturnValues: 'UPDATED_NEW'
      }).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(updatedLocation)
    }
  } catch (err) {
    return getErrorResponse(err)
  }
}

const deleteOfferByIdHandler: ValidatedEventAPIGatewayProxyEvent<typeof getOfferByIdSchema> = async (event) => {
  try {
    await dynamoDB.delete({
      TableName: 'offers-fidel',
      Key: {
        id: event.body.id
      }
    }).promise()

    return formatJSONResponse({
      message: `Offer ${event.body.id} was deleted sucessfully!`
    })
  } catch (err) {
    return getErrorResponse(err)
  }
}

const getAllOffersHandler: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  try {
    const offers = await dynamoDB.scan({
      TableName: 'offers-fidel'
    }).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(offers)
    }
  } catch (err) {
    return getErrorResponse(err)
  }
}

export const getOfferById = middyfy(getOfferByIdHandler)
export const createNewOffer = middyfy(createNewOfferHandler)
export const addNewLocationToOfferBylocationId = middyfy(addNewLocationToOfferBylocationIdHandler)
export const addNewLocationToOfferByBrandId = middyfy(addNewLocationToOfferByBrandIdHandler)
export const deleteOfferById = middyfy(deleteOfferByIdHandler)
export const getAllOffers = middyfy(getAllOffersHandler)
