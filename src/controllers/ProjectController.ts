import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    //también se puede generar proyecto:
    //-sin const project
    //-ycon await Project.create(req.body) en el try

    const project = new Project(req.body);

    //Asigna un manager
    project.manager = req.user.id;

    try {
      await project.save();
      return res.send("Proyecto creado correctamente");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Hubo un error al crear el proyecto");
    }

    res.send("Creando un proyecto!");
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({
        $or: [
          { manager: { $in: req.user.id } },
          { team: { $in: req.user.id } },
        ],
      });
      return res.json(projects);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Hubo un error al crear el proyecto");
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    try {
      const project = await Project.findById(id).populate("tasks");
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error.message });
      }

      if (
        project.manager.toString() !== req.user.id.toString() &&
        !project.team.includes(req.user.id)
      ) {
        const error = new Error("Acción no válida");
        return res.status(404).json({ error: error.message });
      }

      return res.json(project);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Hubo un error al crear el proyecto");
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error.message });
      }

      if (project.manager.toString() !== req.user.id.toString()) {
        const error = new Error("Solo el Manager puede actualizar un proyecto");
        return res.status(404).json({ error: error.message });
      }

      project.clientName = req.body.clientName;
      project.projectName = req.body.projectName;
      project.description = req.body.description;
      await project.save();
      return res.send("Proyecto Actualizado");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Hubo un error al crear el proyecto");
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      //const project = await Project.findByIdAndDelete(id);
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error.message });
      }

      if (project.manager.toString() !== req.user.id.toString()) {
        const error = new Error("Solo el Manager puede eliminar un proyecto");
        return res.status(404).json({ error: error.message });
      }

      await project.deleteOne();
      return res.send("Proyecto Eliminado");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Hubo un error al crear el proyecto");
    }
  };
}
