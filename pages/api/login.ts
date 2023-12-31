// import {dbConnect} from "@/middleware/mongooes";
const connectDb = require ("@/middleware/mongoose")
import User from "@/models/user";
// const bcrypt = require("bcrypt");
// import bcrypt from "bcrypt";
const bcrypt = require('bcrypt')
var jwt = require("jsonwebtoken");

const handler = async (req: any, res: any) => {
  try {
    // const salt = bcrypt.genSaltSync(15);
    // const hash = bcrypt.hashSync(password, salt);
    if (req.method == "POST") {
      const { name, email, password } = req.body;

      let user = await User.findOne({ email: email });

      if (!user) {
        return res.status(200).send({ massage: "Please check your email" });
      }
      // check hash password
      let check = bcrypt.compareSync(password, user.password); // true
      if (check) {
        var token = jwt.sign(
          { email: user.email, name: user.name },
          process.env.NEXT_PUBLIC_JWT_KEY,
          { expiresIn: "1d" }
        );
        res
          .status(200)
          .json({ success: true, token: token, email: user.email, name: name });
      } else {
        res
          .status(200)
          .json({
            success: false,
            error: "Email and Password are not match, try again",
          });
      }
    } else {
      res.status(404).json({ Error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

export default handler