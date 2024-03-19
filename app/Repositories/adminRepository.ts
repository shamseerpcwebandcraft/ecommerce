import Product from "App/Models/Products";
import Order from "App/Models/Order";

export default class emailRepository {
  constructor() {}

  public async listProducts(
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

      const isProductExist = await Product.find(query)
        .skip(offset)
        .limit(pageSize)
        .sort({ createdAt: -1 });

      let Response = { isProductExist };

      return Response;
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

      let Response = { isProductExist };

      return Response;
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

      const isOrderExist = await Order.find(query)
        .skip(offset)
        .limit(pageSize)
        .sort({ createdAt: -1 });

      let Response = { isOrderExist };

      return Response;
    } catch (error) {
      return error;
    }
  }

  public async updateOrdersStatus(delivared_status, order_id) {
    try {
      const order: any = await Order.findById(order_id);

      order.delivered_status = delivared_status;

      // Save the updated order
      await order.save();

      // Return a response indicating success
      return true;
    } catch (error) {
      // Handle any errors that occur during the process
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
      }

      const isOrderExist = await Order.find(query)
        .skip(offset)
        .limit(pageSize)
        .sort({ createdAt: -1 });

        let order=isOrderExist.filter(orders=>{
            orders.delivered_status==="delivered"&&orders.payment_status==="completed"
        })

      // let Response = { isOrderExist };

      return order;
    } catch (error) {
      return false;
    }
  }

  public async adminDashboard(): Promise<any> {
    try {
      const products = await Product.find({ is_active: true });
      const order = await Order.find();

      let total_products = products.length;
      let total_orders = order.length;
      let sales = order.filter((orders) => {
        console.log("orders==",orders)
        orders.delivered_status === "delivered" 
          // orders.payment_status === "completed";
      });
      let sales_quantity = sales.length;

      return {
        total_products: total_products,
        total_orders: total_orders,
        sales: sales_quantity,
      };
    } catch (error) {
      return false;
    }
  }
}
