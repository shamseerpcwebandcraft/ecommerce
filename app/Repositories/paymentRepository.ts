
import Razorpay from "razorpay";

import Order from "App/Models/Order";
import Env from '@ioc:Adonis/Core/Env'
import RazorpayService from 'App/Services/razorpayService'





export default class paymentRepository {
    constructor() {
    }
           
    public async razorpayPaymentIntitation(user_id): Promise<any> {

      
      let amount=100;

    const razorpayService=new RazorpayService()

    const response= await razorpayService.createOrder(amount)
     

       return response
       
    }


}