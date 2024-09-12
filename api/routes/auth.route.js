import express from "express";
import { signup, signin, signout } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: End-point para autenticação de usuários
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Cria uma nova conta de usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na solicitação
 *       500:
 *         description: Erro ao criar usuário
 */
router.post("/signup", signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Realiza o login de um usuário existente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *         headers:
 *           Set-Cookie:
 *             description: Cookie de autenticação
 *             schema:
 *               type: string
 *       401:
 *         description: Credenciais inválidas
 *       404:
 *         description: Usuário não encontrado
 */
router.post("/signin", signin);

/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: Realiza o logout de um usuário
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Desconectado com sucesso
 *       400:
 *         description: Erro ao realizar logout
 */
router.get("/signout", signout);

export default router;
