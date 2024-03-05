import User from "App/Models/User";
import jwt from 'jsonwebtoken';
import Env from '@ioc:Adonis/Core/Env'
import { DateTime } from 'luxon'




export default class userRepository {
    constructor() {
    }
  
    public async sendotp(phone_number): Promise<any> {
      console.log("hii0oooppp");
      const otp = Math.floor(100000 + Math.random() * 900000)

      const expiration_time=DateTime.local().plus({ days: 1 })
 
      console.log(expiration_time)
  
      const isUserExist = await User.findOne({ phone_number: phone_number });
      if (!isUserExist) {
            console.log("user is not exist");

          await User.create(
            { phone_number: phone_number, 
             otp: otp,
             expiration_time:expiration_time}
          );
            
      let debugResponse = { debug: otp };
  
      return debugResponse;
            }else{
              return false;
            }
    }


    public async verifyOtp(otp,phone_number): Promise<any> {

      try{

        const isUserExist = await User.findOne({ phone_number: phone_number });
        console.log(isUserExist)    

        if (isUserExist && isUserExist.expiration_time) {
        //  const expirationTimeISO = isUserExist.expiration_time.toISOString();
          if (DateTime.fromJSDate(isUserExist.expiration_time) < DateTime.now()) {
                  
        
              if (isUserExist.otp == otp) {
                console.log("isuserexist.otp")
                  await User.updateOne(
                    { phone_number: phone_number },
                    { otp: otp }
                  );
                  const payload={
                    user_id: isUserExist.id
                  }
                  const token = jwt.sign(payload, Env.get('JWT_SECRET'), { expiresIn: '5d' });
                  console.log(token)
                  return {
                    status: "success",
                    token
                  };
                }else{
                return { error: 'your otp is incorrect' }             
                }
         
          }else{

            return { error: 'your time is expired' } 
          }
      } else{
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