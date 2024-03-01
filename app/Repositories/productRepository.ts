import Product from "App/Models/Products";

export default class productRepository {
    constructor() {
    }
  
    public async listproducts(): Promise<any> {
 
  
      const isUserExist = await Product.find({is_active:true});
            
      let Response = { isUserExist };
  
      return Response
    }
}
