import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import tasksRoutes from "./routes/tasks.route.js";
import resetRoutes from "./routes/reset.route.js";
import sendEmail from "./routes/form.route.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs, swaggerUiOptions } from "./swaggerConfig.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB conectado");
    const PORT = 4000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta: ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err, "ERROR");
  });

const corsOptions = {
  origin: [
    "https://todolistbackend-c7sp.onrender.com/",
    "http://localhost:3000",
    "http://localhost:4000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// Middleware de CORS
app.use(cors(corsOptions));

// Middleware para tratar solicitações OPTIONS
app.options("*", cors(corsOptions));

// Outros middlewares
app.use(cookieParser());
app.use(express.json());

// Configuração do Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, swaggerUiOptions)
);
//Para acessar a documentação entre em http://localhost:4000/api-docs/

// Suas rotas
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/reset", resetRoutes);
app.use("/api/mail", sendEmail);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    error: message,
    statusCode: statusCode,
  });
});

export default app;
