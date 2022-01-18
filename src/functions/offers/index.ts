import { hiSchema } from './schemas'
import { handlerPath } from '@libs/handlerResolver'

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

export const hiFunction = {
  handler: `${handlerPath(__dirname)}/handler.greetingHi`,
  events: [
    {
      http: {
        method: 'post',
        path: `offers/hi`,
        request: {
          schemas: {
            'application/json': hiSchema
          }
        }
      }
    }
  ]
}
