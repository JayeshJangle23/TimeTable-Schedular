const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.cookies.token; // ✅ read from cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = {
      _id: decoded._id,
      emailId: decoded.emailId,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
