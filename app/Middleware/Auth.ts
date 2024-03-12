import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken';
import Env from '@ioc:Adonis/Core/Env'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException';

export default class Auth {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    console.log("Read here123")

    const  token=ctx.request.header('authorization')?.replace('Bearer ', '');

    if (!token) {
      return ctx.response.unauthorized({ error: 'Must be logged in' })
    }
    
    const publicKey: any = Env.get('JWT_SECRET')

     try {
      var decoded:any = jwt.verify(token, publicKey);
      const userId = decoded.user_id;
      let role= decoded.role // Output: 65e56515a6ff1705d8b6d25a
      // const user=await User.findOne({user_id:decoded.user_id})
      if(role=="user"){
      ctx.request.user={userId:userId}
      }else{
        throw new UnAuthorizedException("You are not authorized to access this route", 422);

      }
    } catch(err) {
       return err
      // err
    }
    // ctx.request.user=decoded.user_id

    await next()
  }
  }

