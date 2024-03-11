
import User from "App/Models/User";
import Order from "App/Models/Order";
import UnAuthorizedException from "App/Exceptions/UnAuthorizedException";


export default class orderRepository {
    constructor() {
    }

    public async getDelivaryAgentOrders(user_id, role, page_no, page_size, filters): Promise<any> {

         throw new UnAuthorizedException("invalid",400)
        try {


          
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
      } catch (error) {
          // Handle errors gracefully
          return error;
      }
      }
}