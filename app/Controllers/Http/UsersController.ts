 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import { HttpStatusCodes } from 'App/utils/HttpStatuses'
//  import { makeJsonResponse, APIResponse } from '../../../utils/JsonResponse'
 import CreateUserValidator from 'App/Validators/CreateUserValidator'
 import VerifyOtpValidator from 'App/Validators/VerifyOtpValidator'
 import UserLoginValidator from 'App/Validators/UserLoginValidator'
 import userRepository from 'App/Repositories/userRepository'
import { makeJsonResponse,APIResponse } from 'App/utils/JsonResponse'
import UnAuthorized from 'App/Exceptions/UnAuthorizedException'

export default class UsersController {
    private userRepository: userRepository

    constructor() {
        this.userRepository = new userRepository()
      }

   public async sendotp(ctx:HttpContextContract){
    // const message = 'application blocked'
    // const status = 403
    
    // throw new UnAuthorized(message, status)

    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    makeJsonResponse
    let response: APIResponse
    

    let { phone_number } = await ctx.request.validate(CreateUserValidator)


    const otpVerificationResponse = await this.userRepository.sendotp(phone_number)

    if(otpVerificationResponse==false){

      response = makeJsonResponse('your mobile is already entered', {}, {}, httpStatusCode)

    }

    if (!otpVerificationResponse) {
      response = makeJsonResponse('Your mobile number is already used', {}, {}, httpStatusCode)
      ctx.response.status(httpStatusCode).json(response)
      //return ctx.response.status(401).json({ message: "Your mobile number is already used" });
    } else {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "you will get a OTP in a few minutes",
          otpVerificationResponse,
          {},
          httpStatusCode,
          isSuccess
        );
    ctx.response.status(httpStatusCode).json(response)
       

   }

}

public async verifyotp(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse

    let { otp,phone_number} = await ctx.request.validate(VerifyOtpValidator)

    const otpVerificationResponse = await this.userRepository.verifyOtp(otp,phone_number)

    // if(otpVerificationResponse.error){
    //   response = makeJsonResponse(otpVerificationResponse.error, {}, {}, httpStatusCode)
    //   ctx.response.status(httpStatusCode).json({response})
    // }   

    if (!otpVerificationResponse) {
      response = makeJsonResponse('Invalid credentials', {}, {}, httpStatusCode)
    } else  {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "successfully verified your otp",
          otpVerificationResponse,
          {},
          httpStatusCode,
          isSuccess
        );
      
       

   }
   ctx.response.status(httpStatusCode).json(response)
  

}

public async login(ctx:HttpContextContract){
  let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
  let isSuccess: boolean = false
  let response: APIResponse

  let { otp,phone_number} = await ctx.request.validate(UserLoginValidator)

  const otpVerificationResponse = await this.userRepository.login(otp,phone_number)

  if (!otpVerificationResponse) {
    response = makeJsonResponse('Invalid credentials', {}, {}, httpStatusCode)
  } else {
      httpStatusCode = HttpStatusCodes.HTTP_OK;
      isSuccess = true;
      response = makeJsonResponse(
        "user login successfully",
        otpVerificationResponse,
        {},
        httpStatusCode,
        isSuccess
      );

     

 }
 ctx.response.status(httpStatusCode).json(response)

}



}



