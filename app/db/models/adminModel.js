const {model,Schema}= require('mongoose');


const adminShema = Schema({
   firstName: {
    type: String,
    require: true
   },
   lastName :{
     type: String,
     require: true
   },
   email:{
    type: String,
    require: true
   },
   password:{
    type: String,
    require: true
   }
});



module.exports.Admin  = model("Admin",adminShema);