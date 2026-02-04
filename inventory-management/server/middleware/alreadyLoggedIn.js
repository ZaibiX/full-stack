import jwt from "jsonwebtoken";

function alreadyLoggedIn(req, res, next) {
    const token = req.cookies?.jwt;

    if (!token) {
        return next();
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        // token is valid → user is already logged in
        return res.status(400).json({ message: "Already logged in" });
    } catch (err) {
        // token is invalid or expired → clear cookie & allow login
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return next();
    }
}

export default alreadyLoggedIn;
