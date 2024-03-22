import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import productRepository from 'App/Repositories/productRepository'
import { HttpStatusCodes } from 'App/utils/HttpStatuses'
import { APIResponse, makeJsonResponse } from 'App/utils/JsonResponse'
import UserCartValidator from 'App/Validators/UserCartValidator'
import UserCheckoutValidator from 'App/Validators/UserCheckoutValidator'
import UserCartUpdateValidator from 'App/Validators/UserCartUpdateValidator'
import DelivaryAgentValidator from 'App/Validators/DelivaryAgentValidator'
import ProductListingValidator from 'App/Validators/ProductListingValidator'

export default class ProductsController {
    private productRepository: productRepository

    constructor() {
        this.productRepository = new productRepository()
      }

      public async addproduct(ctx:HttpContextContract){
           const products=[{
              
                id: 1,
                name: 'iphone 6',
                image:'iphone6.jpg',
                stock:6,
                price:20000,
                is_active:true
           }
              ,
              {
              
                id: 1,
                name: 'sumsung s24',
                image:'iphone6.jpg',
                stock:6,
                price:20000,
                is_active:true
           },
           {
              
            id: 1,
            name: 'iqoo neo 7',
            image:'iphone6.jpg',
            stock:6,
            price:20000,
            is_active:true
       },
       {
              
        id: 1,
        name: 'oppo f23',
        image:'iphone6.jpg',
        stock:6,
        price:20000,
        is_active:true
   },

            ]

            const response= await this.productRepository.createProducts(products)

            if(response){
              ctx.response.status(201).json(response)
            }
           }


   public async listproduct(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse

    let { search } = await ctx.request.validate(ProductListingValidator)
  
    const productListingResponse = await this.productRepository.listproducts(search)
  
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


  public async addToCart(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse
    const user_id= ctx.request.user.userId
  
    let { items } = await ctx.request.validate(UserCartValidator)

    const addtoCartResponse = await this.productRepository.addToCart( items,user_id )
    console.log(addtoCartResponse)
    if(addtoCartResponse.error){
      // response = makeJsonResponse(addtoCartResponse.error, {}, {}, httpStatusCode)
      response = addtoCartResponse.error
      console.log("response",response)
      ctx.response.status(httpStatusCode).json({response})
    }
  
    if (!addtoCartResponse) {
      response = makeJsonResponse('no product available in cart', {}, {}, httpStatusCode)
    } else if(!addtoCartResponse.error) {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "cart listing successfully",
          addtoCartResponse,
          {},
          httpStatusCode,
          isSuccess
        );
  
        ctx.response.status(httpStatusCode).json(response);
  
   }

   
  
  }


  //checkout
  public async checkout(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse
    const user_id= ctx.request.user.userId
  
    let { user_details,shipping_address } = await ctx.request.validate(UserCheckoutValidator)

    const checkoutResponse = await this.productRepository.checkout( user_details,shipping_address,user_id )
  
    if (!checkoutResponse) {
      response = makeJsonResponse('no product available in cart', {}, {}, httpStatusCode)
    } else {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "your order is successfully",
          checkoutResponse,
          {},
          httpStatusCode,
          isSuccess
        );
    ctx.response.status(httpStatusCode).json(response)
       
  
   }
  
  }

  public async updateCart(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse
    const user_id= ctx.request.user.userId
  
    let { items } = await ctx.request.validate(UserCartUpdateValidator)
  
    const updateCartResponse = await this.productRepository.updateCart( user_id,items )
    if(updateCartResponse.error){

      response = updateCartResponse.error
      ctx.response.status(httpStatusCode).json({response})
    }
  
    if (!updateCartResponse) {
      response = makeJsonResponse('no products available', {}, {}, httpStatusCode)
    } else {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "cart quantity updation successfully",
          updateCartResponse,
          {},
          httpStatusCode,
          isSuccess
        );
    ctx.response.status(httpStatusCode).json(response)
       
  
   }
  
  }

  public async getCart(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse
    const user_id= ctx.request.user.userId
  
    //let { items } = await ctx.request.validate(UserCartValidator)
    const getUserCartResponse = await this.productRepository.getCart( user_id )
  
    if (!getUserCartResponse) {
      response = makeJsonResponse('cart is not available', {}, {}, httpStatusCode)
    } else {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "cart listing successfully",
          getUserCartResponse,
          {},
          httpStatusCode,
          isSuccess
        );
    ctx.response.status(httpStatusCode).json(response)
       
  
   }
  
  }

  public async markDelivered(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse

    const user_id= ctx.request.user.userId

    const order_id= ctx.request.param('orderId')
  
    let { delivered_status } = await ctx.request.validate(DelivaryAgentValidator)
    const delivaryAgentResponse = await this.productRepository.markDelivered( order_id,user_id,delivered_status )
  
    if (!delivaryAgentResponse) {
      response = makeJsonResponse('invalid credentials', {}, {}, httpStatusCode)
    } else {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "delivary agent status changing successfully",
          delivaryAgentResponse,
          {},
          httpStatusCode,
          isSuccess
        );
    ctx.response.status(httpStatusCode).json(response)
       
  
   }
  
  }




 



}
