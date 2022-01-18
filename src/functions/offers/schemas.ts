export const hiSchema = {
  type: "object",
  properties: {
    name: { type: 'string' },
    lastName: { type: 'string' },
  },
  required: ['name', 'lastName']
} as const
