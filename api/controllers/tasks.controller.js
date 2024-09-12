import Tasks from "../models/tasks.model.js";
import { errorHandler } from "../utils/error.js";

// Endpoint para criar uma nova tarefa
export const postTask = async (req, res, next) => {
  const { description } = req.body;

  if (!description) {
    return next(
      errorHandler(400, "Por favor, preencha todos os campos obrigatórios!")
    );
  }

  const newTask = new Tasks({
    description,
    status: "to-do",
    order: 0,
    userId: req.user.id,
  });

  try {
    await newTask.save();
    return res.status(201).json({
      message: "Tarefa salva com sucesso!",
      task: newTask,
    });
  } catch (error) {
    if (error._message && error._message.includes("validation failed")) {
      return next(
        errorHandler(400, "Por favor, preencha todos os campos obrigatórios!")
      );
    }
    next(errorHandler(400, "Oops, algo deu errado!"));
  }
};

// Endpoint para atualização em lote das tarefas
export const updateTasksBulk = async (req, res, next) => {
  const { tasks } = req.body;

  try {
    const bulkOps = tasks.map((task) => ({
      updateOne: {
        filter: { _id: task._id },
        update: {
          $set: {
            description: task.description,
            status: task.status,
            order: task.order,
            updatedAt: Date.now(),
          },
        },
      },
    }));

    await Tasks.bulkWrite(bulkOps);

    return res
      .status(200)
      .json({ message: "Tarefas atualizadas com sucesso!" });
  } catch (error) {
    next(errorHandler(400, "Erro ao atualizar tarefas em lote!"));
  }
};

// Endpoint para atualizar uma tarefa específica
export const updateTask = async (req, res, next) => {
  try {
    const taskUpdated = await Tasks.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          status: req.body.status,
          order: req.body.order,
          updatedAt: Date.now(),
        },
      },
      { new: true, runValidators: true }
    );

    if (!taskUpdated) {
      return next(errorHandler(404, "Tarefa não encontrada!"));
    }

    return res
      .status(200)
      .json({ message: "Atualização completa", taskUpdated });
  } catch (error) {
    if (error._message && error._message.includes("validation failed")) {
      return next(
        errorHandler(400, "Por favor preencha todos os campos obrigatórios!")
      );
    } else {
      next(errorHandler(400, "Oops, algo deu errado!"));
    }
  }
};

export const deleteTasksByStatus = async (req, res, next) => {
  const { status } = req.params;

  if (!["to-do", "done"].includes(status)) {
    return next(errorHandler(400, "Status inválido!"));
  }

  try {
    const result = await Tasks.deleteMany({ status });

    return res.status(200).json({
      message: `Todas as tarefas com status '${status}' foram deletadas!`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    next(errorHandler(500, "Erro ao deletar tarefas!"));
  }
};

// Endpoint para deletar uma tarefa
export const deleteTask = async (req, res, next) => {
  try {
    const taskDeleted = await Tasks.findByIdAndDelete(req.params.id);

    if (!taskDeleted) {
      return next(errorHandler(404, "Tarefa não encontrada!"));
    }

    return res.status(200).json({ message: "Tarefa deletada com sucesso!" });
  } catch (error) {
    next(
      errorHandler(400, "Oops, algo deu errado ao tentar deletar a tarefa!")
    );
  }
};

// Endpoint para buscar todas as tarefas
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Tasks.find({}).sort({ order: 1 });
    const todoTasks = tasks.filter((task) => task.status === "to-do");
    const doneTasks = tasks.filter((task) => task.status === "done");

    return res.status(200).json({ todo: todoTasks, done: doneTasks });
  } catch (error) {
    next(errorHandler(500, "Erro ao buscar as tarefas!"));
  }
};
