import User from "../models/user.model.js"
import uploadOnCloudinary from "../config/cloudinary.js"

export const getCurrentUser = async(req, res) => {
    try{
        const userId = req.userId
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message: "user not found"})
        }

        return res.status(200).json(user)
    }catch(error){
        return res.status(400).json({message: "get current user error"})
    }
}

export const updateAssistant = async(req, res)=> {
    try{
        const {assistantName, imageUrl, assistantVoice} = req.body
        let assistantImage;

        if(req.file){
            assistantImage = await uploadOnCloudinary(req.file.path)
        }else{
            assistantImage = imageUrl
        }

        const updatedUser = await User.findByIdAndUpdate(req.userId, {
            assistantName, assistantImage, assistantVoice
        }, {new: true}).select("-password")
        return res.status(200).json(updatedUser)
    }catch(error){
        return res.status(400).json({message: "update Assistant error"})
    }
}