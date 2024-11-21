import User from "../models/user.model.js";

export const getUsersForSidebar= async(req,res)=>{
    try {
        const loggedInUser=req.user._id;

        const filteredUser= await User.find({_id :{ $ne : loggedInUser}}).select("-password")

        res.status(200).json(filteredUser)
        
    } catch (error) {
        console.log("error in getUserForSidebar:",error.message)
        res.status(400).json({error:"internal server error"})
        
    }
}