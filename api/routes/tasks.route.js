import express from "express";
import {
  deleteTask,
  postTask,
  updateTask,
  getTasks,
  updateTasksBulk,
  deleteTasksByStatus,
} from "../controllers/tasks.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: End-point para gerenciamento de tarefas
 */

/**
 * @swagger
 * /api/tasks/create:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descrição da tarefa
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Erro na criação da tarefa
 */
router.post("/create", verifyToken, postTask);

/**
 * @swagger
 * /api/tasks/find:
 *   get:
 *     summary: Retorna todas as tarefas
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas as tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todo:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       order:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 done:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       order:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Não autorizado
 */
router.get("/find", verifyToken, getTasks);

/**
 * @swagger
 * /api/tasks/update-bulk:
 *   post:
 *     summary: Atualiza várias tarefas de uma vez
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID da tarefa
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                   enum: [to-do, done]
 *                 order:
 *                   type: number
 *     responses:
 *       200:
 *         description: Tarefas atualizadas com sucesso
 *       400:
 *         description: Erro na atualização das tarefas
 */
router.post("/update-bulk", verifyToken, updateTasksBulk);

/**
 * @swagger
 * /api/tasks/delete/{id}:
 *   delete:
 *     summary: Deleta uma tarefa pelo ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tarefa a ser deletada
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete("/delete/:id", verifyToken, deleteTask);

/**
 * @swagger
 * /api/tasks/delete/status/{status}:
 *   delete:
 *     summary: Deleta todas as tarefas por status
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *           enum: [to-do, done]
 *         required: true
 *         description: Status das tarefas a serem deletadas
 *     responses:
 *       200:
 *         description: Tarefas deletadas com sucesso
 *       400:
 *         description: Erro ao deletar as tarefas
 */
router.delete("/delete/status/:status", verifyToken, deleteTasksByStatus);

/**
 * @swagger
 * /api/tasks/update/{id}:
 *   post:
 *     summary: Atualiza uma tarefa pelo ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tarefa a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [to-do, done]
 *               order:
 *                 type: number
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       400:
 *         description: Erro na atualização da tarefa
 */
router.post("/update/:id", verifyToken, updateTask);

export default router;
