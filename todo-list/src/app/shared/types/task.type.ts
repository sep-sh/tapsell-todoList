import { TaskEventType } from "../enums/shared.enum";

export interface Task {
  _id: string;
  title: string;
  description: string;
  done: boolean;
  list: string;
  date: Date;
  __v: number;
}


export type TaskEvent = {
  type: TaskEventType,
  data: Task
}