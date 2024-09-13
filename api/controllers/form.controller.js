import nodemailer from "nodemailer";
import { errorHandler } from "../utils/error.js";

// Configuração do transporte do Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // true para 465, false para outras portas
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Função para enviar o e-mail
export const sendEmail = async (req, res, next) => {
  const { name, email, phoneNumber, message} = req.body;

  // Verificação de campos obrigatórios
  if (!name || !email || !phoneNumber || !message) {
    return next(
      errorHandler(401, "Por favor preencha todos os campos obrigatórios!")
    );
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Nova mensagem de contato de ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phoneNumber}\n\nMensagem:\n${message}`,
  };

  try {
    // Envio do e-mail
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.log(error)
    next(
      errorHandler(500, "Erro ao enviar o e-mail, tente novamente mais tarde.")
    );
  }
};
