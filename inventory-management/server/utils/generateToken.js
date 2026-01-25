import jwt from "jsonwebtoken";
export default function generateToken(userId){
    const payload = { userId };
    const secret = 'my-secret-key';
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secret, options);
    return token;
    // console.log(token); 
}