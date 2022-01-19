import { handlerPath } from '@libs/handlerResolver'

import {
  createNewOfferSchema,
  getOfferByIdSchema,
  deleteOfferByIdSchema,
  addNewLocationToOfferByLocationIdSchema,
  addNewLocationToOfferByBrandIdSchema
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

export const addNewLocationToOfferBylocationId = {
  handler: `${handlerPath(__dirname)}/handler.addNewLocationToOfferBylocationId`,
  events: [
    {
      http: {
        method: 'post',
        path: `offers/addNewLocation`,
        request: {
          schemas: {
            'application/json': addNewLocationToOfferByLocationIdSchema
          }
        }
      }
    }
  ]
}

export const addNewLocationToOfferByBrandId = {
  handler: `${handlerPath(__dirname)}/handler.addNewLocationToOfferByBrandId`,
  events: [
    {
      http: {
        method: 'post',
        path: `offers/addNewBrand`,
        request: {
          schemas: {
            'application/json': addNewLocationToOfferByBrandIdSchema
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
