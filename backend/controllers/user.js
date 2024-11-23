import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/user.model.js";
export const register = async (req, res) => {
  try {
    const { fullname, email, password,phonenumber,role } = req.body;
    if(!fullname || !email || !password || !phonenumber || !role){
      return res.status(400).json({ message: "Please provide all the fields" ,success:false });
    }
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" ,success:false });
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      fullname,
      email,
      password:hasedPassword,
      phonenumber,
      role
    });
    res.status(201).json({ message: "User created successfully" ,success:true });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
    try {
        const {email,password,role} = req.body;

        if(!email || !password || !role){
            return res.status(400).json({ message: "Please provide all the fields" ,success:false });
        };
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" ,success:false });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Password does not match" ,success:false });
        }
        if(role !== user.role){
            return res.status(400).json({ message: "Role does not match" ,success:false });
        }
        
        const tokendata = { id: user._id };
        const token = jwt.sign(tokendata, process.env.JWT_SECRET,{ expiresIn: "1d" });
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error,
            no:"shubham kuamr"
         });
    }
}
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "",{maxage:0}).json({ message: "Logout successful" ,success:true});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, bio, skills,phonenumber} = req.body;
    const file=req.file;

    //coulnary aayega idher 
    let skillsArray;
    if(skills){
        skillsArray=skills.split(",");
    }
    const userid=req.id;
    console.log(userid)
    let user=await UserModel.findById(userid);
    console.log(user)
    if(!user){
        return res.status(400).json({
            message:"user not found ",
            success:false
        })
    }
    // updating data
    if(fullname) user.fullname=fullname
    if(email) user.email=email
    if(phonenumber) user.phonenumber=phonenumber
    if(bio) user.profile.bio=bio
    if(skills) user.profile.skills=fullname
    
    
    //resume comes later
    await user.save()

    user={
        id:user._id,
        fullname:user.fullname,
        email:user.email,
        phonenumber:user.phonenumber,
        role:user.role,
        profile:user.profile
    }
    return res.status(200).json({
        user
        
    })

  } catch (error) {
    console.log(error)
  }
};      
