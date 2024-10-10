const jwt = require("jsonwebtoken");

authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = authHeader.replace("Bearer", "").trim();
  if (!token) {
    return res.status(404).json({ message: "Token not found" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

module.exports = authenticateToken;
