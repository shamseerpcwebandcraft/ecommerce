
import RazorpayService from 'App/Services/razorpayService'
import Order from 'App/Models/Order'





export default class paymentRepository {
    constructor() {
    }
           
    public async razorpayPaymentIntitation(user_id): Promise<any> {

      let order:any=await Order.findOne({user_id:user_id})
 
      let amount=order.payable_price
      console.log("amount==",amount)
     // let amount=100;

    const razorpayService=new RazorpayService()

    const response= await razorpayService.createOrder(amount)
     console.log("response==",response)

       return response
       
    }


}