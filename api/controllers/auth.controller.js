import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!req.body.username || !req.body.email || !req.body.password) {
    return next(
      errorHandler(401, "Por favor preencha todos os campos obrigatórios!")
    );
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });

  try {
    const findExistUsername = await User.findOne({ username: username });
    if (findExistUsername)
      return next(
        errorHandler(500, "Um usuário com esse nome já existe, tente outro!")
      );
    const findExistEmail = await User.findOne({ email: email });
    if (findExistEmail)
      return next(
        errorHandler(500, "Um usuário com esse email já existe, tente outro!")
      );
    await newUser.save();
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.log(error)
    next(errorHandler(400, "Oops, algo deu errado!"));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(errorHandler(404, "Usuário ou senha incorreto"));
    }

    // Verificar a senha
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Usuário ou senha incorreto"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const expiryDate = new Date(Date.now() + 3600000);

    // Excluir a senha dos dados que serão retornados
    const { password: hashedPassword, ...resto } = validUser._doc;

    const domain = process.env.NODE_ENV === "production" ? 'todolist-backend-jade.vercel.app' : 'localhost';

    // Configurar o cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
        secure: process.env.NODE_ENV === "production", // Use secure em produção
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Configuração para produção
        path: "/",
        domain: domain,
      })
      .status(200)
      .json(resto);
  } catch (error) {
    console.log(error)
    next(errorHandler(400, "Oops, algo deu errado!"));
  }
};

export const signout = (req, res) => {
  try {
    // res
    //   .clearCookie("access_token")
    //   .status(200)
    //   .json({ message: "Desconectado com sucesso!" });
    const domain = process.env.NODE_ENV === "production" ? 'todolist-backend-jade.vercel.app' : 'localhost';


      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure em produção
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Configuração para produção
        path: "/", // Use o mesmo caminho usado ao definir o cookie
        domain: domain,
      })
      .status(200)
      .json({ message: "Desconectado com sucesso!" });
  } catch (error) {
    next(errorHandler(400, "Oops, algo deu errado!"));
  }
};
