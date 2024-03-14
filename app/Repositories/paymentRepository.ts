
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


    public async razorpayPaymentResponse(webhookpayload): Promise<any> {
      const event_type= webhookpayload.event
      console.log(event_type)
      let paymentstatus:any;
         if(event_type=="payment.captured"){
             paymentstatus="success"

         }else if(event_type=="payment.captured"){
           
         }

         const order= await Order.updateOne({
          payment_status:paymentstatus
        })

  
      const razorpayService=new RazorpayService()

      const response= await razorpayService.webhookResponse()

      if(response){
        return response
      }
       
    }


    


}