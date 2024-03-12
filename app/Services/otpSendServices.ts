

import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'
import UnAuthorized from 'App/Exceptions/UnAuthorizedException'





export default class otpSendService {

      public async sendOtp(otp:number,phone_number:number){
    try {
        // let response = { otp: otp };
        if(Env.get('NODE_ENV') === 'development'){
            return true
        }else{
        // const mobileNumber = req.body.mobileNumber;
        // const otp = Math.floor(100000 + Math.random() * 900000);
             await axios.get('https://www.fast2sms.com/dev/bulk', {
          params: {
            authorization:   Env.get('FAST2SMS_API_KEY'),
            variables_values: `Your OTP is ${otp}`,
            route: 'otp',
            numbers: phone_number
          }
        });
      

        return true 
      }
     } catch (error) {
        console.error('Error sending OTP:', error);
        throw new UnAuthorized(error.message, error.status)
      }
}
}