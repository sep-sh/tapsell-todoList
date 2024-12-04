import { ActionStatus, DialogEvent, ListEventType, TaskEventType } from "../enums/shared.enum"

export type ListActionResult = {
    type: ListEventType,
    status: ActionStatus
}

export type TaskActionResult = {
    type: TaskEventType,
    status: ActionStatus
}


export type List = {
  title: string;
  _id: string;
  date: Date;
  __v: number;
  isMain?: boolean;
};

export type ListId = List['_id'];

export type ListEvent = {
  type: TaskEventType,
  data: List
}

export type NewListDialog = {
  event: DialogEvent,
  data: Partial<List>
}

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
    type: TaskEventType,
    data: Task
  }