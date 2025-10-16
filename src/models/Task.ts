import mongoose, { Schema, Document, Types } from "mongoose";

//el estado de cada tarea
//5 estados diferentes:
const taskStatus = {
  PENDING: "pending", //tarea pendiente
  ON_HOLD: "onHold", //tarea creada
  IN_PROGRESS: "inProgress", //cuando alguien está trabajando con la tarea
  UNDER_REVIEW: "underReview", //revisando la tarea
  COMPLETED: "completed", //tarea completada
} as const; //const los valores no se pueden modificar

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

//parte de typescript
export interface ITask extends Document {
  name: string;
  description: string;
  project: Types.ObjectId;
  status: TaskStatus;
}

//parte de mongoose
export const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    project: {
      type: Types.ObjectId,
      ref: "Project",
    },
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.PENDING,
    },
  },
  { timestamps: true }
);

//para conectar ambos
const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;
