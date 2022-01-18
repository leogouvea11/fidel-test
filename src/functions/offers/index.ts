import { handlerPath } from '@libs/handlerResolver'

import {
  createNewOfferSchema,
  getOfferByIdSchema,
  deleteOfferByIdSchema
} from './schemas'

export const getOfferById = {
  handler: `${handlerPath(__dirname)}/handler.getOfferById`,
  events: [
    {
      http: {
        method: 'post',
        path: `offers/get`,
        request: {
          schemas: {
            'application/json': getOfferByIdSchema
          }
        }
      }
    }
  ]
}

export const createNewOffer = {
  handler: `${handlerPath(__dirname)}/handler.createNewOffer`,
  events: [
    {
      http: {
        method: 'post',
        path: `offers/create`,
        request: {
          schemas: {
            'application/json': createNewOfferSchema
          }
        }
      }
    }
  ]
}

export const deleteOfferById = {
  handler: `${handlerPath(__dirname)}/handler.deleteOfferById`,
  events: [
    {
      http: {
        method: 'delete',
        path: `offers/delete`,
        request: {
          schemas: {
            'application/json': deleteOfferByIdSchema
          }
        }
      }
    }
  ]
}

export const getAllOffers = {
  handler: `${handlerPath(__dirname)}/handler.getAllOffers`,
  events: [
    {
      http: {
        method: 'get',
        path: `offers`
      }
    }
  ]
}
