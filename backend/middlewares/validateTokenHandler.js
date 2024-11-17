const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const validToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeaders = req.headers.authorization || req.headers.authorization;
  if (authHeaders && authHeaders.startsWith("Bearer")) {
    token = authHeaders?.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Invalid token");
      }
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("Token not found");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized access");
  }
});

module.exports = validToken;
