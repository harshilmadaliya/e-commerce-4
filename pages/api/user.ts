// import {dbConnect} from "@/middleware/mongooes";
const connectDb = require ("@/middleware/mongoose")
import User from "@/models/user";
var jwt = require("jsonwebtoken");

const handler = async (req: any, res: any) => {
  if (req.method == "POST") {
    let token = req.body.token;

    if (!token) {
      return res.status(200).send({ massage: "Please login first" });
    }
    let decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);

    let user = await User.find({ email: decoded.email });
    res.status(200).json({user})
   
  } else {
    res.status(404).json({ Error });
  }
};

export default connectDb(handler)