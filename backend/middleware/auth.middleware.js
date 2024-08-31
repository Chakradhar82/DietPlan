let jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        res.status(401).json({
            success: 0,
            message: "Unauthorized request"
        })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
            res.status(401).json({
                success: 0,
                message: "Unauthorized Token"
            })
            return;
        }
        next()
    });
}

module.exports = { verifyJWT }