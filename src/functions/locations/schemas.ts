export const createNewLocationSchema = {
  type: "object",
  properties: {
    address: { type: 'string' },
    brandId: { type: 'string' },
  },
  required: ['address', 'brandId']
} as const

export const getLocationByIdSchema = {
  type: "object",
  properties: {
    id: { type: 'string' },
  },
  required: ['id']
} as const

export const setHasOfferSchema = {
  type: "object",
  properties: {
    id: { type: 'string' },
    brandId: { type: 'string' },
    hasOffer: { type: 'boolean' }
  },
  required: ['hasOffer']
} as const

export const deleteLocationByIdSchema = {
  type: "object",
  properties: {
    id: { type: 'string' },
  },
  required: ['id']
} as const