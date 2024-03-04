import User from "App/Models/User";
import jwt from 'jsonwebtoken';
import Env from '@ioc:Adonis/Core/Env'
import { DateTime } from 'luxon'




export default class userRepository {
    constructor() {
    }
  
    public async sendotp(phone_number): Promise<any> {
      let messege=true
      const otp = Math.floor(100000 + Math.random() * 900000)

      const expiration_time=DateTime.local().plus({ minutes: 30 })
 
  
      const isUserExist = await User.findOne({ phone_number: phone_number });
      if (!isUserExist) {


          await User.create(
            { phone_number: phone_number, 
             otp: otp,
             expiration_time:expiration_time}
          );
            
      let debugResponse = { debug: otp };
  
      return debugResponse;
            }else{
              return messege=false;
            }
    }


    public async verifyOtp(otp,phone_number): Promise<any> {

      try{

        const isUserExist = await User.findOne({ phone_number: phone_number });

      //  if(isUserExist?.expiration_time>DateTime.now)

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
                  status: "success",
                  token
                };
              }
              return { error: 'your otp is incorrect' }             

        }else{
          return { error: 'your mobile number is incorrect' } 
        }
      }catch(error){
        return error
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
          }else{return { error: 'your otp is incorrect' }}  

    }else{
      return { error: 'your mobile is incorrect' }
    }
}
    
}