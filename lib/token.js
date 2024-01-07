import jwt from "jsonwebtoken";

const SECRET = "secret";

function generateAccessToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: '1800s' });
}

function verifyAccessToken(token) {
    return jwt.verify(token, SECRET);
}

export {
    generateAccessToken,
    verifyAccessToken
}