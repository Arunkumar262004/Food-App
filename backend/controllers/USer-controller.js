import userModel from "../models/User-model.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";



// login user
const loginuser = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email:email })


        if (!user) {
            res.json({ success: false, message: "User not found" })
        }


        const isMatch = await bcrypt.compare(password,user.password); 

        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }


        const token = create_token(user._id);  
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        
        res.json({ success: false, message: "Error" })
    }
}



const create_token = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user
const registeruser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // checking user already exist or not
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exist" })
        }

        // email format and password validation
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "please enter strong password" })
        }

        // hasing user psassword
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const newuser = new userModel({
            name: name,
            email: email,
            password: hashpassword,

        })

        const user = await newuser.save();
        const token = create_token(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })

    }

}

export { loginuser, registeruser }