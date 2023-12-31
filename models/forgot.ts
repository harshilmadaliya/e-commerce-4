import { models } from "mongoose";

const mongoose = require('mongoose');

const forgotSchema = new mongoose.Schema({
    email : {type :String , required : true , unique:false},
    emailtoken : {type :String , required : true },  
   
});
mongoose.models= {}


export default mongoose.model("Forgot",forgotSchema)