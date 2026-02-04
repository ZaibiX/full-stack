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

        const token = generateToken(user._id, user.role);
        
        console.log("Login successful, generated token for:", email);
        return res.cookie("jwt", token, {
            httpOnly:true, //js cannot access cookie
            secure: process.env.NODE_ENV !== "development", //only https not http
            maxAge: 1000*60*60, //1 hr
            sameSite:"strict", //only send to this site from where it is sent

        }).json({
            user:{name:user.name,
            email:user.email,
            role:user.role,}
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

        // const token = generateToken(newUser._id, newUser.role);

        console.log("New User Created: ", newUser);
        return res.json({
            user:{name:newUser.name,
            email:newUser.email,
            role:newUser.role,}
        }).status(200)
    }
  }catch(err)
  {
    console.log("Error while sign-up: ",err.message)
        return res.status(500).json({message:"Internal server error while sign up"});
  }
}

export function logout(req,res)
{
    
    try {
        // res.cookie("jwt", "", { maxAge: 0 });
        res.cookie("jwt", "", { expires: new Date(0) });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export function checkAuth(req,res)
{
    return res.status(200).json({message:"User is authenticated", user:{email:req.user.email, role:req.user.role}});
}

// export const protectRoutes = async (req, res, next) => {
//     try {
//         // 1. Get token from cookies
//         const token = req.cookies?.jwt;

//         if (!token) {
//             return res.status(401).json({ message: "Unauthorized - No Token Provided" });
//         }

//         // 2. Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         if (!decoded) {
//             return res.status(401).json({ message: "Unauthorized - Invalid Token" });
//         }

//         // 3. Find user and attach to request (Recommended)
//         // Instead of just ID and Role, fetching the user ensures the account still exists
//         const user = await User.findById(decoded.userId).select("-password");

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Attach full user object to the request
//         req.user = user;

//         // 4. CRITICAL: Call next() to move to the next middleware/controller
//         next();
        
//     } catch (error) {
//         console.error("Error in protectRoutes middleware:", error.message);

//         // Specific error handling for expired tokens
//         if (error.name === "TokenExpiredError") {
//             return res.status(401).json({ message: "Unauthorized - Token Expired" });
//         }

//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };