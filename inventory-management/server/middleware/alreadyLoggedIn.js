function alreadyLoggedIn(req, res, next) {
    const token = req.cookies.jwt;

    if (token) {
        return res.status(400).json({ message: "Already logged in" });
    }

    next();
}

export default alreadyLoggedIn;