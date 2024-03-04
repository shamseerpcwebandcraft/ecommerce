 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import { HttpStatusCodes } from 'App/utils/HttpStatuses'
//  import { makeJsonResponse, APIResponse } from '../../../utils/JsonResponse'
 import CreateUserValidator from 'App/Validators/CreateUserValidator'
 import VerifyOtpValidator from 'App/Validators/VerifyOtpValidator'
 import ProductCreateValidator from 'App/Validators/ProductCreateValidator'
 import UserLoginValidator from 'App/Validators/UserLoginValidator'
 import userRepository from 'App/Repositories/userRepository'
import { makeJsonResponse,APIResponse } from 'App/utils/JsonResponse'

export default class UsersController {
    private userRepository: userRepository

    constructor() {
        this.userRepository = new userRepository()
      }

   public async sendotp(ctx:HttpContextContract){
    console.log("hiiiii");
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    makeJsonResponse
    let response: APIResponse
    

    let { phone_number} = await ctx.request.validate(CreateUserValidator)

    const otpVerificationResponse = await this.userRepository.sendotp(phone_number)
    console.log(otpVerificationResponse,"otpVerificationResponse");

    if(otpVerificationResponse==false){
      console.log("helo mone")
      response = makeJsonResponse('your mobile is already entered', {}, {}, httpStatusCode)
    }

    if (!otpVerificationResponse) {
      return ctx.response.status(401).json("your mobile number is already used")
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
    console.log(otpVerificationResponse)
    if(otpVerificationResponse.error){
      console.log("nayint");
      response = otpVerificationResponse.error
      ctx.response.status(httpStatusCode).json(response)
    }
    

    if (!otpVerificationResponse) {
      response = makeJsonResponse('Invalid credentials', {}, {}, httpStatusCode)
    } else if(!otpVerificationResponse.error) {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "successfully verified your otp",
          otpVerificationResponse,
          {},
          httpStatusCode,
          isSuccess
        );
        ctx.response.status(httpStatusCode).json(response)
       

   }
  

}

public async login(ctx:HttpContextContract){
  let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
  let isSuccess: boolean = false
  let response: APIResponse

  let { otp,phone_number} = await ctx.request.validate(UserLoginValidator)

  const otpVerificationResponse = await this.userRepository.login(otp,phone_number)
  if(otpVerificationResponse.error){
    console.log("nayint");
    response = otpVerificationResponse.error
    ctx.response.status(httpStatusCode).json(response)
  }

  if (!otpVerificationResponse) {
    response = makeJsonResponse('Invalid credentials', {}, {}, httpStatusCode)
  } else(!otpVerificationResponse.error) {
      httpStatusCode = HttpStatusCodes.HTTP_OK;
      isSuccess = true;
      response = makeJsonResponse(
        "user login successfully",
        otpVerificationResponse,
        {},
        httpStatusCode,
        isSuccess
      );
  ctx.response.status(httpStatusCode).json(response)
     

 }

}



}



