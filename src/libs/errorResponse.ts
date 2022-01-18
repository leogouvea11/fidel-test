export const getErrorResponse = (errorMessage: string) => {
  return {
    statusCode: 500,
    body: JSON.stringify({
      message: errorMessage,
    })
  }
}