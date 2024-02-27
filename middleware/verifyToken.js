const jwt = require('jsonwebtoken');
const {verify} = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    const tokenWithoutBearer = token.split(' ')[1];
    try {
      const decodedToken = jwt.verify(tokenWithoutBearer, secretKey);
      // console.log('Decoded Token:', decodedToken);
      req.students = decodedToken;
      next();
    } catch (error) {
      console.error('Token verificaion failed:', error);
      return res.status(401).json({error: 'Token verification failed'});
    }
  }
};

module.exports = verifyToken;
