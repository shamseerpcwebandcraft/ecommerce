import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken';
import { makeJsonResponse, type APIResponse } from 'App/utils/JsonResponse'
import Env from '@ioc:Adonis/Core/Env'

export default class DelivaryAgentAuth {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    console.log("Read here DelivaryAgentAuth 123")

    const  token=ctx.request.header('authorization')?.replace('Bearer ', '');

    let httpStatusCode = 401
    let httpErrorResponse: APIResponse

    if (!token) {
      // return ctx.response.unauthorized({ error: 'Must be logged in' })
      httpErrorResponse = makeJsonResponse('must be Logged In', {}, {}, httpStatusCode)
      return ctx.response.unauthorized(httpErrorResponse)
    }
    
    const publicKey: any = Env.get('JWT_SECRET')

     try {
      var decoded:any = jwt.verify(token, publicKey);
      const userId = decoded.user_id;
      let role= decoded.role
       console.log(role); // Output: 65e56515a6ff1705d8b6d25a
      // const user=await User.findOne({user_id:decoded.user_id})
      if(role=="delivary-agent"){
      ctx.request.user={userId:userId}
      }else{
        httpErrorResponse = makeJsonResponse('invalid token', {}, {}, httpStatusCode)
        return ctx.response.unauthorized(httpErrorResponse)
      }
    } catch(err) {
      console.log(err)
      if(err.name="JsonWebTokenError"){
        httpErrorResponse = makeJsonResponse('Invalid user token', {}, {}, httpStatusCode)
        return ctx.response.unauthorized(httpErrorResponse)
      }else if( err.name == 'NotBeforeError' ||
      err.name == 'TokenExpiredError'
    ){
      httpErrorResponse = makeJsonResponse('invalid token', {}, {}, 403)
      return ctx.response.unauthorized(httpErrorResponse)  
    }
          

      }
      // err}
    // ctx.request.user=decoded.user_id

    await next()
  }
  }


