import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserLoginValidator from 'App/Validators/UserLoginValidator'
import productRepository from 'App/Repositories/productRepository'
import { HttpStatusCodes } from 'App/utils/HttpStatuses'
import { APIResponse, makeJsonResponse } from 'App/utils/JsonResponse'
import ProductCreateValidator from 'App/Validators/ProductCreateValidator'



export default class ProductsController {
    private productRepository: productRepository

    constructor() {
        this.productRepository = new productRepository()
      }

   public async listproduct(ctx:HttpContextContract){
    console.log("hiiiii");
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    makeJsonResponse
    let response: APIResponse

    const 

   }

   public async listproduct(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse
  
    //let { name,price,image,stock,is_active } = await ctx.request.validate(ProductCreateValidator)
  
    const otpVerificationResponse = await this.productRepository.listproducts()
    if(otpVerificationResponse.invalidmobile){
      response = makeJsonResponse('Invalid credentials', {}, {}, httpStatusCode)
    }
  
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
    ctx.response.status(httpStatusCode).json(response)
       
  
   }
  
  }
}
