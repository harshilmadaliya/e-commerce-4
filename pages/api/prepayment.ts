"use client";
// import {dbConnect} from "@/middleware/mongooes";
const connectDb = require ("@/middleware/mongoose")
import Order from "@/models/order";


// Save Order to Order Database

const handler = async (req: any, res: any) => {
    let orderID = Math.floor(Math.random() * 100000000000);
    if (req.method == "POST") {
      const { address, totalValue, cart ,name , email ,pincode,phone } = req.body;
      if (totalValue == 0) {
        res.status(200).json({ success: false, error : "You cart is empty, buy some product" });
        return
      }
      else if (name == '') {
        res.status(200).json({ success: false, error : "Enter your name" });
        return
      }
      else if (pincode.isNaN) {
        res.status(200).json({ success: false, error : "Enate the pincode in Number" });
        return
      }
      else if (phone.isNaN) {
        res.status(200).json({ success: false, error : "Enate the valid phone number" });
        return
      }
      else if (pincode.length > 6 || pincode.length<6) {
        res.status(200).json({ success: false, error : "Enate the valid pincode" });
        return
      }
      else if (phone.length <9 || phone.length>11) {
        res.status(200).json({ success: false, error : "Enate the valid phone number" });
        return
      }
      else if (address == '') {
        res.status(200).json({ success: false, error : "Enate Address" });
        return
      }

      
        let order = new Order({
          userId: orderID,
          name : name,
          email : email,
          address: address,
          pincode: pincode,
          products: cart,
          amount: totalValue,
        });
        
        let r = await order.save();
      

      res.status(200).json({ success: true, r });
    } else {
      res.status(404).json({ success : false , "error" : "some error"});
      return
    }
};

export default handler