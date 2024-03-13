



import Razorpay from "razorpay";
import Env from '@ioc:Adonis/Core/Env'





export default class RazorpayService {
    public async createOrder(amount){
      

      try {
        
      
        // let amount=Order.payable_price
            let keyId=Env.get("RAZORPAY_KEY_ID")
            let keysecret=Env.get("RAZORPAY_KEY_SECRET")

           var instance=new Razorpay({
        key_id:keyId,
        key_secret:keysecret
       })

       var options = {
        amount: amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };

      const myPromise = new Promise((resolve, reject) => {
         instance.orders.create(options, function(err, order) {
        if(err){
           reject(err)

        }else{
           resolve(order)
         
      }})
    });
    
    return myPromise
  }

      // return response

  catch (error) {
        return error
    }
  }

    //webhookResponse

    public async webhookResponse(){
      

      try {
        
       

      }catch (error) {
        return error
    }
    
  }
}
