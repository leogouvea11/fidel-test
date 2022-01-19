import * as uuid from 'uuid'
import { DynamoDB } from 'aws-sdk'
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { getErrorResponse } from '@libs/errorResponse'
import { middyfy } from '@libs/lambda'

import { createNewLocationSchema, getLocationByIdSchema, setHasOfferSchema } from './schemas'

const dynamoDB = new DynamoDB.DocumentClient()

const getLocationByIdHandler: ValidatedEventAPIGatewayProxyEvent<typeof getLocationByIdSchema> = async (event) => {
  try {
    const location = await dynamoDB.get({
      TableName: 'locations-fidel',
      Key: {
        id: event.body.id
      }
    }).promise()
  
    return {
      statusCode: 200,
      body: JSON.stringify(location.Item)
    }
  } catch (err) {
    return getErrorResponse(err)
  }
}

const createNewLocationHandler: ValidatedEventAPIGatewayProxyEvent<typeof createNewLocationSchema> = async (event) => {
  try {
    const newLocation = {
      id: uuid.v1(),
      address: event.body.address,
      brandId: event.body.brandId,
      hasOffer: false
    }
  
    await dynamoDB.put({
      TableName: 'locations-fidel',
      Item: newLocation
    }).promise()
  
    return formatJSONResponse({
      message: 'New location created sucessfully!',
      location: newLocation
    })
  } catch (err) {
    return getErrorResponse(err)
  }
}

const setHasOfferHandler: ValidatedEventAPIGatewayProxyEvent<typeof setHasOfferSchema> = async (event) => {
  try {
    let updateOne = {
      id: event.body.id
    }

    let updateAll = {
      brandId: event.body.brandId
    }

    const location = await dynamoDB.update({
      TableName: 'locations-fidel',
      Key: event.body.brandId ? updateAll : updateOne,
      UpdateExpression: 'set hasOffer = :r',
      ExpressionAttributeValues: {
        ':r': event.body.hasOffer,
      },
    }).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(location)
    }
  } catch (err) {
    return getErrorResponse(err)
  }
}

const deleteLocationByIdHandler: ValidatedEventAPIGatewayProxyEvent<typeof getLocationByIdSchema> = async (event) => {
  try {
    await dynamoDB.delete({
      TableName: 'locations-fidel',
      Key: {
        id: event.body.id
      }
    }).promise()
  
    return formatJSONResponse({
      message: `Location ${event.body.id} was deleted sucessfully!`
    })
  } catch (err) {
    return getErrorResponse(err)
  }
}

const getAllLocationsHandler: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  try {
    const locations = await dynamoDB.scan({
      TableName: 'locations-fidel'
    }).promise()
  
    return {
      statusCode: 200,
      body: JSON.stringify(locations)
    }
  } catch (err) {
    return getErrorResponse(err)
  }
}

export const getLocationById = middyfy(getLocationByIdHandler)
export const createNewLocation = middyfy(createNewLocationHandler)
export const deleteLocationById = middyfy(deleteLocationByIdHandler)
export const getAllLocations = middyfy(getAllLocationsHandler)
export const setHasOffer = middyfy(setHasOfferHandler)
