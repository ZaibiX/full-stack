import User from "../models/users.model.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export async function login(req, res)
{
    const {email, password} = req.body;

    try{
        if(!email || !password){return res.status(400).json({message:"All fields are required"})}

        const user = await User.findOne({email});
        
        if(!user){
           return res.status(401).json({message:"Wrong credentials"});
        }
        
        const isCorrect = await bcrypt.compare(password, user.password);

        if(!isCorrect){
           return res.status(401).json({message:"Wrong credentials"});

        }

        const token = generateToken(user._id);

        return res.cookie("jwt", token, {
            httpOnly:true, //js cannot access cookie
            secure: process.env.NODE_ENV !== "development", //only https not http
            maxAge: 1000*60*60*24, //1 day
            sameSite:"strict", //only send to this site from where it is sent

        }).json({
            name:user.name,
            email:user.email,
        }).status(200)




    }
    catch(err)
    {
        console.log("Error while login: ",err.message)
        return res.status(500).json({message:"Internal server error while login"});
    }

}

export async function signUp(req,res){
    const {name, email, password, role} = req.body;
    if(!name|| !email || !password || !role){
        return res.status(400).json({message:"All fields required"});
    }

  try{
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message:"User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        password:hashedPassword,
        role,
    });

    if(newUser){
        await newUser.save();

        const token = generateToken(newUser._id);
        return res.cookie("jwt", token, {
            httpOnly:true, //js cannot access cookie
            secure: process.env.NODE_ENV !== "development", //only https not http
            maxAge: 1000*60*60*24, //1 day
            sameSite:"strict", //only send to this site from where it is sent

        }).json({
            name:newUser.name,
            email:newUser.email,
        }).status(200)
    }
  }catch(err)
  {
    console.log("Error while sign-up: ",err.message)
        return res.status(500).json({message:"Internal server error while sign up"});
  }
}