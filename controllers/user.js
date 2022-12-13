const userModel = require('../model/user');
const otp = require("../helper/common");


module.exports ={

    // api development
 

    // signup,login,otpverify,forgotpassword,resetpassword,resend otp,getProfile

    signup: (req,res)=>{
        try {
            userModel.findOne({email:req.body.email},(err,result)=>{
                if(err){
                    return res.status(500).send({responseMessage:"Internal server error",responseCode:501,error:err})

                }
                else if(result){
                    return res.status(500).send({responseMessage:"email already exists",responseCode:409,error:err})
                }
             
                else{
                  

                     /* Adding Curent Time for OTP Verification...*/
                     req.body.otpTime = Date.now() + 180000


                    
                   //OTP generate 
                    otpass=otp.generateOTP()
                    req.body.otp=otpass

                    
                    userModel(req.body).save((err1,res1)=>{
                        if(err1){
                            return res.status(500).send({responseMessage:"Internal server error",responseCode:501,error:err1})
        
                        }
                        else{
                            return res.status(200).send({responseMessage:"Signup success",responseCode:200,res:res1})
                        }
                    })
                }
            })
        } catch (error) {
            return res.status(501).send({responseMessage:"Something went wrong",responseCode:501,error:error})
        }
    },




    // Login api

    login:(req,res)=>{
  
        try {
            userModel.findOne({email:req.body.email},(err, res1)=> {
                // console.log(res1.email);
                // console.log(res1.otp);
                // console.log(res1.otpTime);
                // console.log(res1.Time)
                // console.log(res1.otp)
                if(err){
                    console.log("Email is not in Database..!!");
                    return res.status(501).send({responseMessage:"Email is not in database..!!", responseCode:501});
                }
                else {
                    try {
                        if(res1.otp == req.body.otp) {
                        /* Compair OTP at real time...!! */
                            if(res1.otpTime >= Date.now()) {
                                
                                console.log("OTP verifyed..!!!");
                                return res.status(200).send({responseMessage:"OTP Verifyed...!!", responseCode:200})
                            }
                            else {
                                console.log("OTP Time Out Please resend it...!!");
                                return res.status(501).send({responseMessage:"OTP Time Out.. Resnr it..!!", responseCode:501});
                            }
                        }
                        else {
                            console.log("OTP not valid..!!");
                            return res.status(501).send({responseMessage:"OTP not Valid.!!", responseCode:501})
                        }
                    
                    } catch (error) {
                        console.log(error);
                    }
                }
            })
        } catch (error) {
            console.log("Something Went Woring..!");
            console.log(error);
            return res.status(501).send({responseCode:"Something went Worng..!!"});
            
        }
    }

}