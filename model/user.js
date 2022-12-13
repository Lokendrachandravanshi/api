const {Types,Schema,model} = require('mongoose')

const user = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    otp:{
        type:String
    }, 

    
    otpTime:{
        type:String
    },
     mobileNumber:{
        type:Number
    },
})

module.exports = model('user',user)
