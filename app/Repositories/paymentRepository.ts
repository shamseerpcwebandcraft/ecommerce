
import RazorpayService from 'App/Services/razorpayService'
import Order from 'App/Models/Order'





export default class paymentRepository {
    constructor() {
    }
           
    public async razorpayPaymentIntitation(user_id): Promise<any> {

      let order:any=await Order.findOne({user_id:user_id}).sort({createdAt:-1})
 
      let amount=order.payable_price
      console.log("amount==",amount)
     // let amount=100;

    const razorpayService=new RazorpayService()

    const response= await razorpayService.createOrder(amount)
     console.log("response==",response)

     let orderId=response.id
         order.order_id=orderId
         order.save()

       return response
       
    }


    public async razorpayPaymentResponse(webhookpayload): Promise<any> {
      const event_type= webhookpayload.event
      console.log("event_type",event_type)
      let paymentstatus;
         if(event_type=="payment.captured"){
             paymentstatus="completed"

         }else if(event_type=="payment.authorized"){
               paymentstatus="pending"
         }
         const data = JSON.stringify(webhookpayload);
         const parsedData = JSON.parse(data);
         const orderId = parsedData.payload.payment.entity.order_id;
         console.log(parsedData);
         console.log("orderId==kkoi",orderId)
         

         const order = await Order.findOne({paymentgatewayorder_id:orderId})
         if (order) {
             order.payment_status = paymentstatus; 
                 await order.save(); 
                 return order; 
         } else {
             return "No order found"; 
         }
         
            

       
    }


    


}