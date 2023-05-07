const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  age: {
    type: Number,
    
  },
  sex: {
    type: String,
    
  },
  gov_id: {
    type: String,
    
  },
  gov_id_number:{
    type:String
  },
  mobile_no: {
    type: String,
    
  },
  emergency_no:{
    type:String
  },
  guardian:{
    type:String,
  },
  guardian_detail:{
    type:String
  },
  address:{
    type:String
  },
  city:{
    type:String
  },
  pincode:{
    type:String
  },
  occupation:{
    type:String
  },
  religion:{
    type:String
  },
  marital_status:{
    type:String
  },
  blood_group:{
    type:String
  }
});



const User = mongoose.model('User', userSchema);

module.exports = User;
