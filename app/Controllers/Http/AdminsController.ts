import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpStatusCodes } from 'App/utils/HttpStatuses'
import { APIResponse, makeJsonResponse } from 'App/utils/JsonResponse'
import adminRepository from 'App/Repositories/adminRepository'
import AdminProductListingValidator from 'App/Validators/AdminProductListingValidator'
import AdminProductUpdateValidator from 'App/Validators/AdminProductUpdateValidator'
import AdminOrderStatusValidator from 'App/Validators/AdminOrderStatusValidator'
import AdminOrderListingValidator from 'App/Validators/AdminOrderListingValidator'
import SalesListingValidator from 'App/Validators/SalesListingValidator'


export default class AdminsController {
    private adminRepository: adminRepository

    constructor() {
        this.adminRepository = new adminRepository()
      }


    public async listProduct(ctx:HttpContextContract){
        let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
        let isSuccess: boolean = false
        let response: APIResponse

        let { page_no,page_size,search } = await ctx.request.validate(AdminProductListingValidator)
      
        const productListingResponse = await this.adminRepository.listProducts(page_no,page_size,search)
      
        if (!productListingResponse) {
          response = makeJsonResponse('no products available', {}, {}, httpStatusCode)
        } else {
            httpStatusCode = HttpStatusCodes.HTTP_OK;
            isSuccess = true;
            response = makeJsonResponse(
              "product listing successfully",
              productListingResponse,
              {},
              httpStatusCode,
              isSuccess
            );
        ctx.response.status(httpStatusCode).json(response)
           
      
       }
      
      }

      public async updateProduct(ctx:HttpContextContract){
        let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
        let isSuccess: boolean = false
        let response: APIResponse
        let product_id=ctx.request.qs().product_id
        console.log("id==",product_id)

        let { stock,price,is_active } = await ctx.request.validate(AdminProductUpdateValidator)
          console.log(stock)
        const productUpdationResponse = await this.adminRepository.updateProducts(stock,price,is_active,product_id)
      
        if (!productUpdationResponse) {
          response = makeJsonResponse('invalid credentials', {}, {}, httpStatusCode)
        } else {
            httpStatusCode = HttpStatusCodes.HTTP_OK;
            isSuccess = true;
            response = makeJsonResponse(
              "product upadation successfully",
              productUpdationResponse,
              {},
              httpStatusCode,
              isSuccess
            );
        ctx.response.status(httpStatusCode).json(response)
           
      
       }
      
      }

      public async listOrders(ctx:HttpContextContract){
        let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
        let isSuccess: boolean = false
        let response: APIResponse

        let { page_no,page_size,start_date,end_date } = await ctx.request.validate(AdminOrderListingValidator)
      
        const ordersListingResponse = await this.adminRepository.listOrders(page_no,page_size,start_date,end_date)
      
        if (!ordersListingResponse) {
          response = makeJsonResponse('no orders available', {}, {}, httpStatusCode)
        } else {
            httpStatusCode = HttpStatusCodes.HTTP_OK;
            isSuccess = true;
            response = makeJsonResponse(
              "orders listing successfully",
              ordersListingResponse,
              {},
              httpStatusCode,
              isSuccess
            );
        ctx.response.status(httpStatusCode).json(response)
           
      
       }
      
      }

      public async updateOrdersStatus(ctx:HttpContextContract){
        let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
        let isSuccess: boolean = false
        let response: APIResponse
        let order_id=ctx.request.qs().order_id


        let { delivared_status } = await ctx.request.validate(AdminOrderStatusValidator)

        const adminOrderStatusResponse = await this.adminRepository.updateOrdersStatus(delivared_status,order_id)
      
        if (!adminOrderStatusResponse) {
          response = makeJsonResponse('invalid credentials', {}, {}, httpStatusCode)
        } else {
            httpStatusCode = HttpStatusCodes.HTTP_OK;
            isSuccess = true;
            response = makeJsonResponse(
              "product upadation successfully",
              adminOrderStatusResponse,
              {},
              httpStatusCode,
              isSuccess
            );
        ctx.response.status(httpStatusCode).json(response)
           
      
       }
      
      }


      public async salesList(ctx:HttpContextContract){
        let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
        let isSuccess: boolean = false
        let response: APIResponse

        let { page_no,page_size,start_date,end_date } = await ctx.request.validate(SalesListingValidator)
      
        const salesListingResponse = await this.adminRepository.salesListing(page_no,page_size,start_date,end_date)
      
        if (!salesListingResponse) {
          response = makeJsonResponse('no sales list available', {}, {}, httpStatusCode)
        } else {
            httpStatusCode = HttpStatusCodes.HTTP_OK;
            isSuccess = true;
            response = makeJsonResponse(
              "sales listing successfully",
              salesListingResponse,
              {},
              httpStatusCode,
              isSuccess
            );
        ctx.response.status(httpStatusCode).json(response)
           
      
       }
      
      }

      public async adminDashboard(ctx:HttpContextContract){
        let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
        let isSuccess: boolean = false
        let response: APIResponse

        // let { page_no,page_size,start_date,end_date } = await ctx.request.validate(AdminProductListingValidator)
      
        const adminDahsboardResponse = await this.adminRepository.adminDashboard()
      
        if (!adminDahsboardResponse) {
          response = makeJsonResponse('invalid credentials', {}, {}, httpStatusCode)
        } else {
            httpStatusCode = HttpStatusCodes.HTTP_OK;
            isSuccess = true;
            response = makeJsonResponse(
              "admin dashboard listing successfully",
              adminDahsboardResponse,
              {},
              httpStatusCode,
              isSuccess
            );
        ctx.response.status(httpStatusCode).json(response)
           
      
       }
      
      }

     
}
