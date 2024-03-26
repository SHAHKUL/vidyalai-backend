const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
    if (req.headers.auth) {
      let decode = jwt.verify(req.headers.auth, process.env.key);
      if (decode) {
        req.val = decode.id;
        next();
      } else {
        res.status(404).json({ message: "it is not crt token" });
      }
    } else {
      res.status(404).json({ message: "UNUAUTHORIZED" });
    }
  }

  module.exports=authentication