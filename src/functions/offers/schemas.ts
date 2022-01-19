export const createNewOfferSchema = {
  type: "object",
  properties: {
    name: { type: 'string' },
    brandId: { type: 'string' },
  },
  required: ['name', 'brandId']
} as const

export const getOfferByIdSchema = {
  type: "object",
  properties: {
    id: { type: 'string' },
  },
  required: ['id']
} as const

export const addNewLocationToOfferByLocationIdSchema = {
  type: "object",
  properties: {
    id: { type: 'string' },
    locationId: { type: 'string' },
  },
  required: ['id', 'locationId']
} as const

export const addNewLocationToOfferByBrandIdSchema = {
  type: "object",
  properties: {
    id: { type: 'string' },
    brandId: { type: 'string' },
  },
  required: ['id', 'brandId']
} as const

export const deleteOfferByIdSchema = {
  type: "object",
  properties: {
    id: { type: 'string' },
  },
  required: ['id']
} as const