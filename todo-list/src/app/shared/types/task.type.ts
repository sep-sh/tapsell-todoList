import { ActionEventType } from "../enums/shared.enum";

export interface Task {
  _id: string;
  title: string;
  description: string;
  done: boolean;
  list: string;
  date: Date;
  __v: number;
}

export type TaskId = Task['_id'];


export type TaskEvent = {
  type: ActionEventType,
  data: Task
}