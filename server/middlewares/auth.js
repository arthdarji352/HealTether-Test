import JWT from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  //valdiation
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "UnAuthorized User",
    });
  }

  const decodeToken = JWT.decode(token, process.env.JWT_SECRET);
  // console.log(decodeToken);
  req.userId = decodeToken.id;

  next();
};

export default auth;
