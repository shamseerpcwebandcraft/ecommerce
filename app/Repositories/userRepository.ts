import User from "App/Models/User";
import jwt from 'jsonwebtoken';
import Env from '@ioc:Adonis/Core/Env'




export default class userRepository {
    constructor() {
    }
  
    public async sendotp(phone_number): Promise<any> {
      let messege:any 
      const otp = Math.floor(100000 + Math.random() * 900000)
 
  
      const isUserExist = await User.findOne({ phone_number: phone_number });
      if (!isUserExist) {


          await User.create(
            { phone_number: phone_number, 
             otp: otp}
          );
            
      let debugResponse = { debug: otp };
  
      return debugResponse;
            }else{
              return messege ='your mobile number is already exist';
            }
    }


    public async verifyOtp(otp,phone_number): Promise<any> {

      let invalidmobile:any

        const isUserExist = await User.findOne({ phone_number: phone_number });

        if(isUserExist) {
        
            if (isUserExist.otp == otp) {
                await User.updateOne(
                  { phone_number: phone_number },
                  { otp: otp }
                );
                const payload={
                  phone_number: phone_number
                }
                const token = jwt.sign(payload, Env.get('JWT_SECRET'), { expiresIn: '1h' });
                return {
                  token
                };
              }else{
                return 'your ttp is incorrrect'
              }

        }else{
          return 'your mobile number is not valid'
        }
    }
    public async login(otp,phone_number): Promise<any> {
 
    const isUserExist = await User.findOne({ phone_number: phone_number });

    if(isUserExist) {
    
        if (isUserExist.otp == otp) {
            await User.updateOne(
              { phone_number: phone_number },
              { otp: otp }
            );
            const payload={
              phone_number: phone_number
            }
            const token = jwt.sign(payload, Env.get('JWT_SECRET'), { expiresIn: '1h' });
            return {
              token
            };
          }

    }else{
      return error='your phone number is not valid'
    }
}
    
}