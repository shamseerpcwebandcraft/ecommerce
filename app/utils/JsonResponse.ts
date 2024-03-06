import Env from '@ioc:Adonis/Core/Env'

export type APIResponse = {
  statusCode: number
  message: string
  success: boolean
  data: object
  errors: object
  meta: object
}
export const makeJsonResponse = (
  message,
  dataPayload,
  errors,
  statusCode,
  isSuccess = false,
  meta = {}
): APIResponse => {
  const environment = Env.get('NODE_ENV')
  if (environment == 'production') {
    delete dataPayload.debug
  }

  return {
    statusCode,
    message,
    data: dataPayload,
    success: isSuccess,
    errors,
    meta,
  }
}
