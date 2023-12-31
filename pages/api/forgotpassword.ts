// import connectDb from '@/middleware/mongooes'
import connectDb from "@/middleware/mongoose";

import Forgot from "@/models/forgot";
import User from "@/models/user";
import bcrypt from "bcrypt";

var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const handler = async (req: any, res: any) => {
  // const con = await dbConnect()
  if (req.method == "POST") {
    const { email, password, sendEmail } = req.body;

    if (sendEmail) {
      let extingUser = await User.findOne({ email: email });
     
      if (extingUser != null) {
        // Ganreat Token and save in database
        let token = jwt.sign(
          { email: email },
          process.env.NEXT_PUBLIC_JWT_EMAILTOKEN_KEY,
          {
            expiresIn: "1h",
          }
        );
        let forgot = new Forgot({
          email: email,
          emailtoken: token,
        });

        let forg = await forgot.save();

        //Send Email
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "harshilmadaliya00@gmail.com",
            pass: "iwfz opyd ljdy pndi",
          },
        });
        // Email options
        const emailTemplate = `We have sent you this email in response to your request to reset your password on E-Commerce. 
          
          <br/><br/>
    
        To reset your password for please follow the link below:
        <br/><br/>
        <a href="${process.env.NEXT_PUBLIC_HOST}/forgotpassword?token=${token}">Click here to reset password</a>
    
        
        <br/><br/>
    
        We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and clicking on the "Change Email Address or Password" link.
    
        <br/><br/>
    
        If you need help, or you have any other questions, feel free to email on "harshilmadaliyag@gmail.com".
    
        <br/><br/>
    
        E-Commerce Customer Service
        <br/><br/>`;

        const mailOptions = {
          from: "harshilmadaliya00@gmail.com",
          to: `${email}`,
          subject: "Reset Password on E-Commerce website",
          text: "Body of your email",
          html: emailTemplate,
        };
        transporter.sendMail(mailOptions, function (error: any, info: any) {
          if (error) {
          } else {
            res.status(200).json({ success: true, massager: "ok" });
          }
        });

        res
          .status(200)
          .json({ success: true, error: "Reset Url was Sent On this Email" });
      } else {
        res
          .status(200)
          .json({
            success: false,
            error:
              "Not any Account was been Created By this Email, Check Your Email!",
          });
      }
    } else {
      let newtoken = req.query.token;

      
      let check = await Forgot.findOne({ emailtoken: newtoken });
      
      let checkUser = await User.findOne({ email: check.email });
      
      const salt = await bcrypt.genSaltSync(15);
      const newhash = await bcrypt.hashSync(password, salt);
      
      let updateUser = await User.findOneAndUpdate({
        email: check.email,
        password: newhash,
      });
      

      let removeforgot = await Forgot.deleteOne({ email: check.email });

      res.status(200).json({
        success: true,
        error: "Password was been Successfully changed",
      });
    }
  } else {
    res.status(200).json({
      success: false,
      error: "Some error Occerred please Contect Harshil",
    });
  }
};
export default connectDb(handler)

function expect(subject: string) {
  throw new Error("Function not implemented.");
}
