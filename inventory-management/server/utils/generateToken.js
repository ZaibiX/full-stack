import jwt from "jsonwebtoken";
export default function generateToken(userId,role){
    const payload = { userId, userRole:role };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secret, options);
    return token;
    // console.log(token); 
}