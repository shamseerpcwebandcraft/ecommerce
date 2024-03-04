import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import productRepository from 'App/Repositories/productRepository'
import { HttpStatusCodes } from 'App/utils/HttpStatuses'
import { APIResponse, makeJsonResponse } from 'App/utils/JsonResponse'
import UserCartValidator from 'App/Validators/UserCartValidator'


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
    const user_id= ctx.request.user
  
    let { items } = await ctx.request.validate(UserCartValidator)
  
    const productListingResponse = await this.productRepository.addToCart( items,user_id )
  
    if (!productListingResponse) {
      response = makeJsonResponse('no product available in cart', {}, {}, httpStatusCode)
    } else {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "cart listing successfully",
          productListingResponse,
          {},
          httpStatusCode,
          isSuccess
        );
    ctx.response.status(httpStatusCode).json(response)
       
  
   }
  
  }
  // public async updateCart(ctx:HttpContextContract){
  //   let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
  //   let isSuccess: boolean = false
  //   let response: APIResponse
  
  //   let { quantity } = await ctx.request.validate(UserCartValidator)
  
  //   const productListingResponse = await this.productRepository.updateCart( quantity )
  
  //   if (!productListingResponse) {
  //     response = makeJsonResponse('no products available', {}, {}, httpStatusCode)
  //   } else {
  //       httpStatusCode = HttpStatusCodes.HTTP_OK;
  //       isSuccess = true;
  //       response = makeJsonResponse(
  //         "cart quantity updation successfully",
  //         productListingResponse,
  //         {},
  //         httpStatusCode,
  //         isSuccess
  //       );
  //   ctx.response.status(httpStatusCode).json(response)
       
  
  //  }
  
  // }
}
