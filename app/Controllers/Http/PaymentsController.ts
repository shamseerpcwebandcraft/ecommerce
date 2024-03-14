 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpStatusCodes } from 'App/utils/HttpStatuses'
import { APIResponse, makeJsonResponse } from 'App/utils/JsonResponse'
import paymentRepository from 'App/Repositories/paymentRepository'


export default class PaymentsController {
    private paymentRepository: paymentRepository

    constructor() {
        this.paymentRepository = new paymentRepository()
      }
    public async razorpayPaymentIntitation(ctx:HttpContextContract){


    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse
     const user_id= ctx.request.user.userId
     console.log("user_id==",user_id)
    // const role= ctx.request.user.role
  
    //let { amount } = await ctx.request.validate(razorpayPymentGatewayValidator)
    const createPaymentTokenResponse = await this.paymentRepository.razorpayPaymentIntitation(user_id)
  
    if (!createPaymentTokenResponse) {
      response = makeJsonResponse('order is not available', {}, {}, httpStatusCode)
    } else {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "order listing successfully",
          createPaymentTokenResponse,
          {},
          httpStatusCode,
          isSuccess
        );

       
  
   }
   ctx.response.status(httpStatusCode).json(response)



    }

    public async razorpayWebhookResponse(ctx:HttpContextContract){


      let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
      let isSuccess: boolean = false
      let response: APIResponse
   
        const payload=ctx.request.body()
       // console.log("payload==",JSON.stringify(payload))
      // const role= ctx.request.user.role
    
      //let { amount } = await ctx.request.validate(razorpayPymentGatewayValidator)
      const razorpayPaymentResponse = await this.paymentRepository.razorpayPaymentResponse(payload)
    
      if (!razorpayPaymentResponse) {
        response = makeJsonResponse('webhook is not available', {}, {}, httpStatusCode)
      } else {
          httpStatusCode = HttpStatusCodes.HTTP_OK;
          isSuccess = true;
          response = makeJsonResponse(
            "webhook invoked",
            razorpayPaymentResponse,
            {},
            httpStatusCode,
            isSuccess
          );
  
         
    
     }
     ctx.response.status(httpStatusCode).json(response)
  
  
  
      }

    
    
}
