import express from "express";
import { sendEmail } from "../controllers/form.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Form
 *   description: End-point para envio de formulários de contato
 */

/**
 * @swagger
 * /api/mail/send-form:
 *   post:
 *     summary: Envia um e-mail com os dados do formulário de contato
 *     tags: [Form]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Nome do remetente"
 *               email:
 *                 type: string
 *                 description: "Email do remetente"
 *               phoneNumber:
 *                 type: string
 *                 description: "Número de telefone do remetente"
 *               message:
 *                 type: string
 *                 description: "Mensagem do remetente"
 *               recipientEmail:
 *                 type: string
 *                 description: "(Opcional) Email que receberá a mensagem do formulário. Se não fornecido, será usado o predefinido."
 *     responses:
 *       200:
 *         description: "E-mail enviado com sucesso"
 *       401:
 *         description: "Campos obrigatórios não preenchidos"
 *       500:
 *         description: "Erro ao enviar o e-mail"
 */
router.post("/send-form", sendEmail);

export default router;
