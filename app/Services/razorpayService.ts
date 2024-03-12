



import Razorpay from "razorpay";
import Env from '@ioc:Adonis/Core/Env'





export default class RazorpayService {
    public async createOrder(amount){
        // let amount=Order.payable_price
            let keyId=Env.get("RAZORPAY_KEY_ID")
            console.log(keyId)
            let keysecret=Env.get("RAZORPAY_KEY_SECRET")
            console.log(keysecret)

           var instance=new Razorpay({
        key_id:keyId,
        key_secret:keysecret
       })

       var options = {
        amount: amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };

      instance.orders.create(options, function(err, order) {
        console.log(order);
        if(err){
            console.log(err)
        }
        return order
      })
    }
    
}