import Mail from "@ioc:Adonis/Addons/Mail";
import User from "App/Models/User";

export default class emailRepository {
  constructor() {}
  public async otpSendEmail(user_id): Promise<any> {
    try {
      const user = await User.findById(user_id);
      let otp: number = 89857;
      let phoneNumber = user?.phone_number;

      let emailHtmlString = await this.makehtml(
        "verification otp",
        `your otp is ${otp}`
      );

      await Mail.send((message) => {
        message
          .from("shamseerpcshan@gmail.com")
          .to(phoneNumber + "@gmail.com")
          .subject("Otp Verification!")
          .html(emailHtmlString);
      });
      //   .htmlView('email_template', { subject: 'Order succesfully',content:'your order is ready' })

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async orderSuccessEmail(user_id): Promise<any> {
    try {
        let items = [
            { name: "iphone", quantity: 2, price: 10000 },
            { name: "sumsung", quantity: 1, price: 15000 },
            { name: "oppo", quantity: 3, price: 20000 }
        ];
      const user = await User.findById(user_id);
      let phoneNumber = user?.phone_number;

      let makeOrderHtmlString = await this.makeOrderHtml(
        'Order Success!!',
         'Your Order is Ready to Ship',
         items,
         'your total price is 45000'
      );

      await Mail.send((message) => {
        message
          .from("shamseerpcshan@gmail.com")
          .to(phoneNumber + "@gmail.com")
          .subject("Order Success!")
          .html(makeOrderHtmlString);
      });
      //   .htmlView('email_template', { subject: 'Order succesfully',content:'your order is ready' })

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private async makehtml(subject, content) {
    return `<html>
             <head>
                 <title>Ecommerce App</title>
             </head>
             <body>
                 <h3>${subject}</h3>
                 <p>${content}</p>
             </body>
         </html>`;
  }

  private async makeOrderHtml(title,content,items,total_price) {
    let year= new Date().getFullYear()
    let htmlContent = `<html>
        <head>
            <title>Order Success</title>
        </head>
        <body>
        <h2>${title}</h2>
        <p>${content}<p>
            <table style="border: 1px solid black">
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>`;
    
    items.forEach(item => {
        let name = item.name;
        let quantity = item.quantity;
        let price = item.price;

        htmlContent += `
            <tr>
                <td>${name}</td>
                <td>${quantity}</td>
                <td>${price}</td>
            </tr>`;
    });

    htmlContent += `
            </table>
            <p>${total_price}<p>
            <p>Alright reserverved ${year}<p>
        </body>
    </html>`;

    return htmlContent;
}

}
