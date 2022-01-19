import type { AWS } from '@serverless/typescript'

import {
  getAllOffers,
  createNewOffer,
  getOfferById,
  deleteOfferById,
  addNewLocationToOfferBylocationId,
  addNewLocationToOfferByBrandId
} from '@functions/offers'

import {
  createNewLocation,
  deleteLocationById,
  getAllLocations,
  getLocationById,
  setHasOffer
} from '@functions/locations'

const SERVICE_NAME = "fidel-test"

const serverlessConfiguration: AWS = {
  service: SERVICE_NAME,
  frameworkVersion: '2',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
        Resource: "*",
      },
      {
        Effect: "Allow",
        Action: [
          "lambda:InvokeFunction",
          "lambda:InvokeAsync",
        ],
        Resource: "*",
      }
    ],
  },
  functions: {
    getAllOffers,
    createNewOffer,
    getOfferById,
    deleteOfferById,
    addNewLocationToOfferBylocationId,
    addNewLocationToOfferByBrandId,
    createNewLocation,
    deleteLocationById,
    getAllLocations,
    getLocationById,
    setHasOffer
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      OffersDynamoTable: {
        Type: "AWS::DynamoDB::Table",
        DeletionPolicy: "Retain",
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          TableName: "offers-fidel",
        },
      },
      LocationsDynamoTable: {
        Type: "AWS::DynamoDB::Table",
        DeletionPolicy: "Retain",
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          TableName: "locations-fidel",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
