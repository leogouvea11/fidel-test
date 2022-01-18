import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { formatJSONResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { DynamoDB } from "aws-sdk"

import { hiSchema } from './schemas'

const dynamoDB = new DynamoDB.DocumentClient()

const getAllOffersHandler: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  const offers = await dynamoDB.scan({
    TableName: "offers-fidel"
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(offers)
  }
}

const hi: ValidatedEventAPIGatewayProxyEvent<typeof hiSchema> = async (event) => {
  return formatJSONResponse({
    message: `Hi ${event.body.name} ${event.body.lastName}, welcome to the exciting Serverless world!`,
    event
  })
}

export const getAllOffers = middyfy(getAllOffersHandler)
export const greetingHi = middyfy(hi)
