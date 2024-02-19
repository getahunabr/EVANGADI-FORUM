const { statusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
async function authMiddleware(req, res, next) {
  const authHeader = req.headers.autherization;

  if (!authHeader || !authHeader.startwith("Bearer")) {
    return res
      .status(statusCodes.autherized)
      .json({ msg: "authentication invalid" });
  }
  if (!authHeader) {
    return res
      .status(statusCodes.autherized)
      .json({ msg: "Autherization invalid" });
  }
  const token = authHeader.split("")[1];
  console.log(authHeader);
  console.log(token);
  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res
      .status(statusCodes.autherized)
      .json({ msg: "Autentication Invalid" });
  }
}
module.exports = authMiddleware;
