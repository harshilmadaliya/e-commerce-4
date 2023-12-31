// import { NextResponse } from "next/server";

const mongoose = require('mongoose');
const dotenv = require ('dotenv')
dotenv.config()

// import mongoose from "mongoose";
const connectDb = (handler:any) => async (req: any, res: any) =>  {

  // if(req.nextUrl.pathname.startsWith("/api")){
  //   NextResponse.next().headers.append("Access-Control-Allow-Origin" , "*")
  // }

    if (mongoose.connections[0].readyState) {
      return handler(req, res)
    }
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected mongodb")
    return handler(req,res)


  };
  
  export default connectDb