import { handlerPath } from '@libs/handlerResolver'

import {
  createNewLocationSchema,
  deleteLocationByIdSchema,
  getLocationByIdSchema,
  setHasOfferSchema
} from './schemas'

export const getLocationById = {
  handler: `${handlerPath(__dirname)}/handler.getlocationById`,
  events: [
    {
      http: {
        method: 'post',
        path: `locations/get`,
        request: {
          schemas: {
            'application/json': getLocationByIdSchema
          }
        }
      }
    }
  ]
}

export const createNewLocation = {
  handler: `${handlerPath(__dirname)}/handler.createNewLocation`,
  events: [
    {
      http: {
        method: 'post',
        path: `locations/create`,
        request: {
          schemas: {
            'application/json': createNewLocationSchema
          }
        }
      }
    }
  ]
}

export const setHasOffer = {
  handler: `${handlerPath(__dirname)}/handler.setHasOffer`,
  events: [
    {
      http: {
        method: 'post',
        path: `locations/setHasOffer`,
        request: {
          schemas: {
            'application/json': setHasOfferSchema
          }
        }
      }
    }
  ]
}

export const deleteLocationById = {
  handler: `${handlerPath(__dirname)}/handler.deleteLocationById`,
  events: [
    {
      http: {
        method: 'delete',
        path: `locations/delete`,
        request: {
          schemas: {
            'application/json': deleteLocationByIdSchema
          }
        }
      }
    }
  ]
}

export const getAllLocations = {
  handler: `${handlerPath(__dirname)}/handler.getAllLocations`,
  events: [
    {
      http: {
        method: 'get',
        path: 'locations'
      }
    }
  ]
}
