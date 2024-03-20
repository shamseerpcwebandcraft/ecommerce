import Product from "App/Models/Products";
import Order from "App/Models/Order";

export default class emailRepository {
  constructor() {}

  public async listProducts(
    page_no,
    page_size
  ): Promise<any> {
    try {
      const pageNo: number = page_no || 1;
      const pageSize: number = page_size || 10;

      const offset: number = (pageNo - 1) * pageSize;


      const Products = await Product.find()
        .skip(offset)
        .limit(pageSize)
        .sort({ createdAt: -1 });

        let total_count=Products.length

       let products={Products,total_count:total_count}

      return products;
    } catch (error) {
      return error;
    }
  }

  public async updateProducts(
    stock,
    price,
    is_active,
    product_id
  ): Promise<any> {
    try {
      const isProductExist: any = await Product.findById(product_id);
      console.log(isProductExist);

      if (isProductExist) {
        isProductExist.stock = stock;
        isProductExist.price = price;
        isProductExist.is_active = is_active; // Corrected assignment
        await isProductExist.save();
      }



      return isProductExist;
    } catch (error) {
      return error;
    }
  }

  public async listOrders(
    page_no,
    page_size,
    start_date,
    end_date
  ): Promise<any> {
    try {
      const pageNo: number = page_no || 1;
      const pageSize: number = page_size || 10;

      const offset: number = (pageNo - 1) * pageSize;

      const query: any = {};

      if (start_date && end_date) {
        query.createdAt = { $gte: start_date, $lte: end_date };
      }

      const order = await Order.find(query)
        .skip(offset)
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .select({
          items: 1,
          userDetails: 1,
          payment_status: 1,
          payment_mode: 1,
          shipping_address: 1,
          payable_price: 1,
          shipping_charge: 1,
          delivered_status: 1
      });

      let total_count=order.length

      let orders={order,total_count:total_count}

     return orders;

    } catch (error) {
      return error;
    }
  }

  public async updateOrdersStatus(delivared_status, order_id) {
    try {
      const order: any = await Order.findById(order_id);

      order.delivered_status = delivared_status;


      await order.save();


      return true;
    } catch (error) {

      return false;
    }
  }

  public async salesListing(
    page_no,
    page_size,
    start_date,
    end_date
  ): Promise<any> {
    try {
      const pageNo: number = page_no || 1;
      const pageSize: number = page_size || 10;

      const offset: number = (pageNo - 1) * pageSize;

      const query: any = {};

      if (start_date && end_date) {
        query.createdAt = { $gte: start_date, $lte: end_date };
        query.payment_status="completed"
        query.delivered_status = "delivered"
      }else{
        query.payment_status="completed"
        query.delivered_status = "delivered"
      }

      const order = await Order.find(query)
        .skip(offset)
        .limit(pageSize)
        .sort({ createdAt: -1});

     
        let total_count=order.length

       let products={order,total_count:total_count}

      return products;
    } catch (error) {
      return false;
    }
  }

  public async adminDashboard(): Promise<any> {
    try {
      const products = await Product.countDocuments({ is_active: true })

      const totalOrdersCount = await Order.countDocuments();

      const completedOrdersCount = await Order.countDocuments({ payment_status: "completed", delivered_status: "delivered" });


      return {
        total_products: products,
        total_orders: totalOrdersCount,
        sales: completedOrdersCount,
      };
    } catch (error) {
      return false;
    }
  }
}

