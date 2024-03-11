import User from "App/Models/User";
import jwt from 'jsonwebtoken';
import Env from '@ioc:Adonis/Core/Env'
import { DateTime } from 'luxon'
import otpSendService from "App/Services/otpSendServices";




export default class userRepository {
    constructor() {
    }



  
    public async sendotp(phone_number,role): Promise<any> {
      console.log(phone_number,role)
    
      const otp = Math.floor(100000 + Math.random() * 900000)

      const expiration_time=DateTime.local().plus({ days: 1 })


    const otpService=new otpSendService()

      const serviceResponse= await otpService.sendOtp(otp,phone_number)
      console.log(serviceResponse)
 
      const isUserExist:any = await User.findOne({ phone_number: phone_number,is_verified:true });
      //const isVerified = isUserExist.is_verified;
      //console.log("isVerified",isVerified)



      if (!isUserExist&&serviceResponse) {


          await User.create(
            { phone_number: phone_number,
              role:role, 
             otp: otp,
             expiration_time:expiration_time,
             is_verified:false,
            }
          );
            
      let response = { otp: otp };
  
      return response
            }else{
              return false;
            }
    }


    public async verifyOtp(otp,phone_number): Promise<any> {

      try{

        const isUserExist = await User.findOne({ phone_number: phone_number });
 

        if (isUserExist && isUserExist.expiration_time) {
               
          //const expirationTimeISO = isUserExist.expiration_time.toISOString();
     
          if (DateTime.fromJSDate(isUserExist.expiration_time) > DateTime.now()) {
            console.log("success date ")
                 console.log(isUserExist.otp)
                 console.log(otp)
              if (isUserExist.otp == otp) {
                       console.log("success otp")
                     await User.updateOne(
                    { phone_number: phone_number },
                    { otp: otp, is_verified: true } 
                  );
                  console.log("isUserExist.role",isUserExist.role)
                  const payload={
                    user_id: isUserExist.id,
                    role:isUserExist.role
                  }
                  const token = jwt.sign(payload, Env.get('JWT_SECRET'), { expiresIn: '5d' });

                  return {
                    status: "success",
                    token
                  };
                }else return false         
              
         
          }else return false
          
      } else return false 
      
       
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
          }else return false 

    }else return false
}
    
}