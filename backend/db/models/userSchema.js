import { Schema,model } from "mongoose";

const userSchema = Schema({
  username: {
    type: String,
    
 },
email: {
    type: String,
    
},
contact: {
    type: Number,
    require:true
},
password: {
    type: String
},
otp :{
    type: Number,
}

})
const User = model('user',userSchema);
export default User;