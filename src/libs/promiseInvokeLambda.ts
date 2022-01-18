import { Lambda } from "aws-sdk"

export const promiseInvokeLambda = async ({ functionName, payload }) => {
  const lambda = new Lambda()
  return lambda.invoke({
    InvocationType: 'Event',
    FunctionName: functionName,
    LogType: 'None',
    Payload: JSON.stringify(payload)
  }).promise()
}