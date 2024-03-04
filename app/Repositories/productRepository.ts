import Product from "App/Models/Products";
import Cart from "App/Models/Cart";

export default class productRepository {
    constructor() {
    }

    public async createProducts(products: { id: number; name: string; image: string; stock: number; price: number; is_active: boolean; }[]): Promise<any> {
     
       try {
        console.log(products)
        
        
        
      
      const response = await Product.insertMany(
        products
        );
        console.log(response)
            
      if(response){
        return response
      }
    } catch (error) {
        return error
    }
  
      
    }
  
    public async listproducts(): Promise<any> {
 
         try {
          
       
      const isUserExist = await Product.find({is_active:true});
            
      let Response = { isUserExist };
  
      return Response
    } catch (error) {
     return error;
    }
    }


    public async addToCart( items,total_price,user_id,quantity ): Promise<any> {
 
      try {
        

      const isCartExist = await Cart.create({
        items:items,
        total_price:total_price,
        user_id:user_id,
        quantity:quantity
      })
      if(!isCartExist){
        return 'failed cart'
      }
            
      let Response = { isCartExist };
  
      return Response
    }
   catch (error) {
      return error  
   }
  } 

    public async updateCart( quantity ): Promise<any> {
 
    try {
      
   
      const isCartExist = await Cart.updateOne({
        quantity:quantity
      })
      if(!isCartExist){
        return 'your updation is failed'
      }
            
      let Response = { isCartExist };
  
      return Response
    }
   catch (error) {
      return error;
  }
}
}
