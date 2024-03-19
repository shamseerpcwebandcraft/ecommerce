/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/auth/signup', async () => {
  return { hello: 'world' }
})

Route.group(()=>{
  Route.post("/product", "ProductsController.addproduct");
Route.get("/product", "ProductsController.listproduct");
Route.post("/cart", "ProductsController.addToCart").middleware('auth')
Route.get("/cart", "ProductsController.getCart").middleware('auth')
Route.post("/cart/update", "ProductsController.updateCart").middleware('auth')
Route.post("/checkout", "ProductsController.checkout").middleware('auth')
Route.get("/get-order", "OrdersController.getOrder").middleware('auth')
}).prefix('/user')


Route.group(()=>{
  Route.post("/sendotp", "UsersController.sendotp");
  // Route.post("/auth/verifyotp", "UsersController.verifyotp");
  Route.post("/verifyotp", "UsersController.verifyotp");
  Route.post("/login", "UsersController.login");
}).prefix('/auth')


Route.group(()=>{
  Route.post("/:orderId", "ProductsController.markDelivered").middleware('DelivaryAgentAuth')
Route.get("/orders", "OrdersController.getDeliveryOrders").middleware('DelivaryAgentAuth')
  
}).prefix('/delivary-agent')

Route.group(()=>{
  Route.post("/otp-sending", "EmailsController.otpSendEmail").middleware('auth')
  Route.post("/order-success", "EmailsController.orderSuccessEmail").middleware('auth')
}).prefix('/email')

Route.group(()=>{
  Route.post("/razorpay-payment-initiation", "PaymentsController.razorpayPaymentIntitation").middleware('auth')
  Route.post("/razorpay/webhook", "PaymentsController.razorpayWebhookResponse")
  Route.get('/', async ({ view }) => {
    const html = await view.render('razorpay_pay_button', {})
    
    return html
  })
}).prefix('/payment')

Route.group(()=>{
    Route.get("/products","AdminsController.listProduct").middleware('admin')
    Route.post("/products","AdminsController.updateProduct").middleware('admin')
    Route.get("/orders","AdminsController.listOrders").middleware('admin')
    Route.post("/orders","AdminsController.updateOrdersStatus").middleware('admin')
    Route.get("/sales-list","AdminsController.salesList").middleware('admin')
    Route.get("/dashboard","AdminsController.adminDashboard").middleware('admin')
}).prefix('/admin')




