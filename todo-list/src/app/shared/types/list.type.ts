import { TaskEventType, DialogEvent } from "../enums/shared.enum";

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