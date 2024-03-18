import Product from "App/Models/Products";
import Cart from "App/Models/Cart";
import User from "App/Models/User";
import Order from "App/Models/Order";

export default class productRepository {
    constructor() {
    }

    public async createProducts(products: { id: number; name: string; image: string; stock: number; price: number; is_active: boolean; }[]): Promise<any> {
     
       try {
      
      const response = await Product.insertMany(
        products
        );

            
      if(response){
        return response
      }
    } catch (error) {
        return error
    }
  
      
    }
  
    public async listproducts(): Promise<any> {
 
         try {
          
       
      const isProductExist = await Product.find({is_active:true});
            
      let Response = { isProductExist };
  
      return Response
    } catch (error) {
     return error;
    }
    }


    public async addToCart(items, user_id): Promise<any> {
      try {

        // const cart = await Cart.findOne({ user_id: user_id }).sort({createdAt:-1})

    
        let total_price = 0; 
    
        for (const { id, quantity } of items) {
             
  
          const product:any = await Product.findById(id)

    
          //quantity is lessthan the stock
          if ( product.stock >= quantity ) {
            const price = product.price;
            total_price += price * quantity;
        } else {
            return { error: 'product is not available' };
        }
        
        
        }
        if(user_id){
          const user=await User.findOne({_id:user_id})
          const userphonenumber=user?.phone_number
        
        
     
        const isCartExist = await Cart.create({
          items: items,
          user_id: user_id,
          total_price: total_price, 
          phonenumber:userphonenumber
        });
      
        if (!isCartExist) {
         
          return 'failed cart';
        }
    
      
        return { isCartExist };
      }
      } catch (error) {
      
        return error;
      }
    }


    public async updateCart(user_id, items): Promise<any> {
      try {

        const cart = await Cart.findOne({user_id:user_id});
    
        if (!cart) {
          throw new Error('Cart not found');
        }
    
        let total_price = 0;
    
        for (const { id, quantity } of items) {
          const product = await Product.findOne({ _id: id });
    
          if (!product || product.stock === undefined || product.stock <= quantity) {
            throw new Error('Product is not available');
          }
    
          const price = product.price;
          total_price += price * quantity;
        }
    
        // if (user_id) {
        //   const user = await User.findOne({ _id: user_id });
        //  // const userPhoneNumber = user?.phone_number;
        // }
    
        cart.items = items;
        cart.total_price = total_price;
        await cart.save();
    
        const response = { data: cart };
    
        return response;
      } catch (error) {
        return { error: error.message }; // Wrap error in a meaningful response
      }
    }
    



    public async checkout(user_details,shipping_address, user_id): Promise<any> {
      try {
         const cart=await Cart.findOne({user_id:user_id})

         const shipping_charge=40
         
         const payment_status = "pending"
         const payment_mode="online";

         if(cart){
          const payable_price = (cart?.total_price ?? 0) + shipping_charge;
         
         const order=await Order.create({
          user_id:user_id,
          items:cart?.items,
          user_details:user_details,
          shipping_address:shipping_address,
          shipping_charge:shipping_charge,
          payable_price:payable_price,
          payment_status:payment_status,
          payment_mode:payment_mode
         })
         if(order){
          await Cart.deleteOne({user_id:user_id})
          return order
         }else{
          return {error:"this order is not ready "}
         }
        }
      
      } catch (error) {
      
        return error;
      }
    }


    public async getCart(user_id): Promise<any> {
      try {
         const cart=await Cart.find({user_id:user_id})
          
         if(cart){
          return cart
         }else{
          return "cart is not available"
         }
      
      } catch (error) {
      
        return error;
      }
    }

    public async markDelivered(order_id,user_id,delivered_status): Promise<any> {
      try {

        const user=await User.findOne({_id:user_id})
        const roles=user?.role
        console.log("roles==",roles)
        
        // Find the order by its ID
        const order = await Order.findById(order_id);
        
        if (!order) {
          // If the order doesn't exist, return an error
          return { error: 'Order not found' };
        }
        if(roles=='delivary-agent'){
        // Update the delivered_status of the order to 'delivered'
        order.delivered_status = delivered_status;
        
        // Save the updated order
        await order.save();
        
        
        // Return a response indicating success
        return { message: 'delivary agent change the status' };
        }else return false
      } catch (error) {
        // Handle any errors that occur during the process
        return false
      }
    }


    


    

//     public async updateCart( quantity ): Promise<any> {
 
//     try {
      
   
//       const isCartExist = await Cart.updateOne({
//         quantity:quantity
//       })
//       if(!isCartExist){
//         return 'your updation is failed'
//       }
            
//       let Response = { isCartExist };
  
//       return Response
//     }
//    catch (error) {
//       return error;
//   }
// }
}
