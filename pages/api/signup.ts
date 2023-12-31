
import connectDb from "@/middleware/mongoose";
import User from "@/models/user";
const bcrypt = require("bcrypt");
import mongoose from "mongoose";

const handler = async (req: any, res: any) => {
  if (req.method == "POST") {
    const { name, email, password } = req.body;
    try {
      let x = await User.findOne({ email: email });
      //chacking user exting
      if (x.email == email) {
        res
          .status(200)
          .json({
            success: false,
            error: "User already exist by this email Id, try another email",
          });
        return;
      }
      // generate hase
    } catch (error) {
      const salt = bcrypt.genSaltSync(15);
      const hash = bcrypt.hashSync(password, salt);
      // Store hash in your password DB.
      let user = await User.create({
        name: name,
        email: email,
        password: hash,
      });
      let user1 = await user.save();
      res.status(404).json({ success: user1 });
    }
  } else {
    res.status(404).json({ Error });
  }
};

export default connectDb(handler)