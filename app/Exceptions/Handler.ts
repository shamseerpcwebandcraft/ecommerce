/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { makeJsonResponse } from 'App/utils/JsonResponse';


export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }
  constructor () {

    console.log("heloooooo");
    super(Logger)
  }

 
public async handle(error: any, ctx: HttpContextContract) {


  /**
   * Self handle the validation exception
   */
  if (error.code === 'E_VALIDATION_FAILURE') {
    let array=error.messages.errors
    const newArray = array.map(data => {
      const { rule, ...rest } = data;
      return rest;
    });

    let response=makeJsonResponse('check the data entered', {}, newArray,error.status)
    console.log(error.messages.errors)
  //makeJsonResponse()
    return ctx.response.status(422).json(response);

  }

  /**
   * Forward rest of the exceptions to the parent class
   */
  return super.handle(error, ctx)
}
}

