import jwt from "jsonwebtoken";
export default function protectRoutes(req, res, next){
    const token = req.cookies?.jwt;

    if(!token){
        return  res.status(401).json({message:"Unauthorized, no token"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log("protect routes decoded: ",decoded)

        if(!decoded){
            return res.status(401).json({message:"Unauthorized, invalid token"});
        }
        // req.userId = decoded.userId;
        req.user = {role: decoded.userRole, id: decoded.userId};
        next();
    }
    catch(err){
        console.log("Error in protectRoutes middleware: ", err.message);
        return res.status(401).json({message:"Unauthorized, invalid token"});
    }
}