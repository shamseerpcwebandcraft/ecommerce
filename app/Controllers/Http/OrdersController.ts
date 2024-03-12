 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpStatusCodes } from 'App/utils/HttpStatuses'
import { APIResponse, makeJsonResponse } from 'App/utils/JsonResponse'
import  orderRepository  from 'App/Repositories/orderRepository'

import getDelivaryAgentValidator from 'App/Validators/GetDelivaryAgentValidator'

export default class OrdersController {
    private orderRepository: orderRepository

    constructor() {
        this.orderRepository = new orderRepository()
      }


    public async getDeliveryOrders(ctx:HttpContextContract){
        let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
        let isSuccess: boolean = false
        let response: APIResponse
        // const user_id= ctx.request.user.userId
        // const role= ctx.request.user.role
      
        let { page_no,page_size,filters } = await ctx.request.validate(getDelivaryAgentValidator)
        const getDelivaryAgentOrdersResponse = await this.orderRepository.getDelivaryAgentOrders(  page_no, page_size, filters )
      
        if (!getDelivaryAgentOrdersResponse) {
          response = makeJsonResponse('order is not available', {}, {}, httpStatusCode)
        } else {
            httpStatusCode = HttpStatusCodes.HTTP_OK;
            isSuccess = true;
            response = makeJsonResponse(
              "order listing successfully",
              getDelivaryAgentOrdersResponse,
              {},
              httpStatusCode,
              isSuccess
            );
    
           
      
       }
       ctx.response.status(httpStatusCode).json(response)
      
      }


      public async getOrder(ctx:HttpContextContract){
        let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
        let isSuccess: boolean = false
        let response: APIResponse
        const user_id= ctx.request.user.userId
      
        //let { items } = await ctx.request.validate(UserCartValidator)
        const getUserOrderResponse = await this.orderRepository.getOrder( user_id )
        console.log("getUserOrderResponse",getUserOrderResponse)
      
        if (!getUserOrderResponse) {
          response = makeJsonResponse('order is not available', {}, {}, httpStatusCode)
        } else {
            httpStatusCode = HttpStatusCodes.HTTP_OK;
            isSuccess = true;
            response = makeJsonResponse(
              "order listing successfully",
              getUserOrderResponse,
              {},
              httpStatusCode,
              isSuccess
            );
        ctx.response.status(httpStatusCode).json(response)
           
      
       }
      
      }


   
    
}
