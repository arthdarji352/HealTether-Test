import bcrypt from "bcryptjs";
import userModel, { userMdoel } from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    //userExists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(500).send({
        success: false,
        message: "email already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).send({
      success: true,
      message: "Registeration Success, please login",
      newUser,
    });
  } catch (error) {
    console.log(error, "Error in Register Controller");
    res.status(500).json({ message: "error while registering user" });
  }
};

//LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Add Email OR Password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    //user valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "USer Not Found",
      });
    }
    //check pass
    const isMatch = await bcrypt.compare(password, user.password);
    //valdiation pass
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid credentials",
      });
    }
    //token
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).cookie("token", token).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      message: "Error In Login Api",
      error,
    });
  }
};

export const getUserController = async (req, res) => {
  const id = req.userId;

  const user = await userMdoel.findById(id);

  user.password = undefined;

  return res.status(200).json({
    success: true,
    user,
  });
};
