

import Order from "App/Models/Order";
import User from "App/Models/User";



export default class orderRepository {
    constructor() {
    }

    public async getDelivaryAgentOrders( page_no, page_size, filters): Promise<any> {

        //  throw new UnAuthorizedException("invalid",400)
        try {

            // const isDelivaryAgentExist = await User.findById(user_id);

                     
            
          
          const pageNo: number = page_no || 1;
          const pageSize: number = page_size || 10;
  
          const offset: number = (pageNo - 1) * pageSize;
  
  
        //   const user: any = await User.findOne({ _id: user_id });
  
          let query: any = {};
  
      
          if (filters) {
              query.delivered_status = filters;
          }
  
          let orders = await Order.find(query)
                                 .skip(offset) 
                                 .limit(pageSize) 
                                 .sort({ createdAt: -1 }); 
  
      
  
          return orders;
      }catch (error) {
        // Handle errors gracefully
        return error;
    }
}


      public async getOrder(user_id): Promise<any> {

        //  throw new UnAuthorizedException("invalid",400)
        try {
            const user= await User.findById(user_id)

            if(user){
                let orders = await Order.findOne({user_id:user_id}).select({
                    items: 1,
                    payment_status: 1,
                    payment_mode: 1,
                    shipping_charge: 1,
                    payable_price: 1
                });
                
                
   
          return orders;
            }else{
                return false
            }
      } catch (error) {
          // Handle errors gracefully
          return error;
      }
      }





}