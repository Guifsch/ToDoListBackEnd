import express from "express";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/reset.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Password Reset
 *   description: End-point para redefinição de senha de usuários
 */

/**
 * @swagger
 * /api/reset/forgot-password:
 *   post:
 *     summary: Envia um e-mail de redefinição de senha
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário para redefinição de senha
 *     responses:
 *       200:
 *         description: E-mail de redefinição enviado com sucesso.
 *       400:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao enviar o e-mail de redefinição.
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /api/reset/reset-password:
 *   post:
 *     summary: Redefine a senha de um usuário
 *     tags: [Password Reset]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de redefinição de senha enviado por e-mail
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do token de redefinição de senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: A nova senha do usuário
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso.
 *       400:
 *         description: Token inválido, expirado ou nova senha igual à atual.
 *       500:
 *         description: Erro ao redefinir a senha.
 */
router.post("/reset-password", resetPassword);

export default router;
