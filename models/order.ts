
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    name : {type: String , required :true},
    email : {type: String , required :true},
    address : {type :String , required : true},
    pincode : {type: Number , required :true , },
    products : {type:Object},
    amount : {type: Number , required :true },
   
},{timestamps:true});
mongoose.models= {}

export default mongoose.model("Order",OrderSchema)