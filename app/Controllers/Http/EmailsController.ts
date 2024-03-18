import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpStatusCodes } from "App/utils/HttpStatuses"
import { makeJsonResponse,APIResponse } from "App/utils/JsonResponse"
import emailRepository from "App/Repositories/emailRepository"

export default class EmailsController {
    private emailRepository: emailRepository

    constructor() {
        this.emailRepository = new emailRepository()
      }

    public async otpSendEmail(ctx:HttpContextContract){
        let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
        let isSuccess: boolean = false
        let response: APIResponse
         const user_id= ctx.request.user.userId
        // const role= ctx.request.user.role
      
        // let {  } = await ctx.request.validate(getDelivaryAgentValidator)
        const otpSendEmailResponse = await this.emailRepository.otpSendEmail(user_id)
        console.log("getDelivaryAgentOrdersResponse==",otpSendEmailResponse)
      
        if (!otpSendEmailResponse) {
          response = makeJsonResponse('email sending is failed', {}, {}, httpStatusCode)
        } else {
            httpStatusCode = HttpStatusCodes.HTTP_OK;
            isSuccess = true;
            response = makeJsonResponse(
              "otp send to email sending successfully",
              otpSendEmailResponse,
              {},
              httpStatusCode,
              isSuccess
            );
    
           
      
       }
       ctx.response.status(httpStatusCode).json(response)
      
      }

      public async orderSuccessEmail(ctx:HttpContextContract){
        let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
        let isSuccess: boolean = false
        let response: APIResponse
         const user_id= ctx.request.user.userId
        // const role= ctx.request.user.role
      
        // let {  } = await ctx.request.validate(getDelivaryAgentValidator)
        const orderSuccessEmailResponse = await this.emailRepository.orderSuccessEmail(user_id)
        console.log("getDelivaryAgentOrdersResponse==",orderSuccessEmailResponse)
      
        if (!orderSuccessEmailResponse) {
          response = makeJsonResponse('email sending is failed', {}, {}, httpStatusCode)
        } else {
            httpStatusCode = HttpStatusCodes.HTTP_OK;
            isSuccess = true;
            response = makeJsonResponse(
              "otp send to email sending successfully",
              orderSuccessEmailResponse,
              {},
              httpStatusCode,
              isSuccess
            );
    
           
      
       }
       ctx.response.status(httpStatusCode).json(response)
      
      }
}


