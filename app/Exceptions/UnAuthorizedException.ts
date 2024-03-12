import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { makeJsonResponse } from 'App/utils/JsonResponse';

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnAuthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnAuthorizedException extends Exception {
    public async handle(error: this, ctx: HttpContextContract) {
      console.log("error.message==",error.message)
      console.log("error==",error)
      let response=makeJsonResponse(error.message, {}, error,error.status)
      return ctx.response.status(error.status).json(response);
      }
}
