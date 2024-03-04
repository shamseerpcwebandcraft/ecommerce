import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken';
import Env from '@ioc:Adonis/Core/Env'

export default class Auth {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    console.log("Read here123")

    const  token=ctx.request.header('authorization')?.replace('Bearer ', '');
    console.log(token)
    if (!token) {
      return ctx.response.unauthorized('Unauthorized access')
    }
    
    const publicKey: any = Env.get('JWT_SECRET')
    console.log(publicKey);
     try {
      var decoded:any = jwt.verify(token, publicKey);
      const userId = decoded.user_id;
       console.log(userId); // Output: 65e56515a6ff1705d8b6d25a
      // const user=await User.findOne({user_id:decoded.user_id})
      ctx.request.user.user_id=userId
    } catch(err) {
      console.log(err)
      // err
    }
    // ctx.request.user=decoded.user_id

    await next()
  }
  }

