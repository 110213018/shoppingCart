import jwt from "jsonwebtoken";

const SECRET = "secret";

function generateAccessToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: '1800s' });
}

function verirfyAccessToken(token) {
    return jwt.verify(token, SECRET);
}

export {
    generateAccessToken,
    verirfyAccessToken
}