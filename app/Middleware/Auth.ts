import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  symbols,
  AuthenticationException
} from '@adonisjs/auth'
import jwt from 'jsonwebtoken';

export default class Auth {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    const  token=ctx.request.header('authorization')
    if (!token) {
     return 'Unauthorized access'
      }
    
    const publicKey: any = process.env.JWT_SECRETS;
    try {
      var decoded = jwt.verify(token, publicKey);
    } catch(err) {
      // err
    }

    await next()
  }
  }

