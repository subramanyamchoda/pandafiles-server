const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: "Unauthorized - No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = {authenticateUser} ;
