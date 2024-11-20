import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import  generateTokenAndSetCookies from "../utils/jsonWebToken.js"

export const signup= async (req,res)=>{
    try {
        const{fullName, userName, password, confirmPassword, gender}=req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"password do not match"})
        }
        const user=await User.findOne({userName});

        if(user){
            return res.status(400).json({error:"userName already exists"})
        }

        //Hash password here
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password, salt)

        //https://avatar-placeholder.iran.liara.run/

        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?${userName}`
        const girleProfilePic=`https://avatar.iran.liara.run/public/girl?${userName}`

        const newUser=new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic: gender==="male" ? boyProfilePic : girleProfilePic
        })


        if(newUser){
            await newUser.save();
            generateTokenAndSetCookies(newUser._id, res)
            

        res.status(201).json({
            _id: newUser._id,
            fullName:newUser.fullName,
            userName:newUser.userName,
            profilePic:newUser.profilePic,

    })
        }
        else{
            res.status(400).json({error:"Invalid User data"})
        }

        
        
    } catch (error) {
        console.log("error in signup controller",error.message)
        res.status(400).json({error:"internal server error"})
    }
    
    
}

export const login=async (req,res)=>{
    try {
        const {userName, password}=req.body;
        const user=await User.findOne({userName})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid credentials"})
        }

        generateTokenAndSetCookies(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.userName,
            profilePic:user.profilePic
        })

        
    } catch (error) {
        console.log("error in Login controller",error.message)
        res.status(400).json({error:"internal server error"})
    }
   
    
}



export const logout=async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({Message:"Logged out sucessfully"})
        
    }catch (error) {
        console.log("error in Login controller",error.message)
        res.status(400).json({error:"internal server error"})
    }
    
}