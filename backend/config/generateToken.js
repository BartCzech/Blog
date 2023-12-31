const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: "30m"})
};

module.exports = generateToken;