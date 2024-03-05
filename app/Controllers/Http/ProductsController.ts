import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import productRepository from 'App/Repositories/productRepository'
import { HttpStatusCodes } from 'App/utils/HttpStatuses'
import { APIResponse, makeJsonResponse } from 'App/utils/JsonResponse'
import UserCartValidator from 'App/Validators/UserCartValidator'
import UserCheckoutValidator from 'App/Validators/UserCheckoutValidator'
import UserCartUpdateValidator from 'App/Validators/UserCartUpdateValidator'

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
  
    const productListingResponse = await this.productRepository.listproducts()
  
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
    console.log("userdetaisss==",user_id);
  
    let { items } = await ctx.request.validate(UserCartValidator)
         console.log("pushpa 2")
    const addtoCartResponse = await this.productRepository.addToCart( items,user_id )
    console.log(addtoCartResponse)
  
    if (!addtoCartResponse.response) {
      response = makeJsonResponse('no product available in cart', {}, {}, httpStatusCode)
    } else {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "cart listing successfully",
          addtoCartResponse,
          {},
          httpStatusCode,
          isSuccess
        );
    ctx.response.status(httpStatusCode).json(response)
       
  
   }
  
  }


  //checkout
  public async checkout(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse
    const user_id= ctx.request.user.userId
    console.log("userdetaisss==",user_id);
  
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
    const cartId=ctx.request.param
  
    let { items } = await ctx.request.validate(UserCartUpdateValidator)
  
    const productListingResponse = await this.productRepository.updateCart( cartId,items )
  
    if (!productListingResponse) {
      response = makeJsonResponse('no products available', {}, {}, httpStatusCode)
    } else {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "cart quantity updation successfully",
          productListingResponse,
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
         console.log("pushpa 2")
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
}
