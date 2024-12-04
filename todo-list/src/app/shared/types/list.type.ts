import { ActionEventType } from "../enums/shared.enum";

export type List = {
  title: string;
  _id: string;
  date: Date;
  __v: number;
  isMain?: boolean;
};


export type ListId = List['_id'];



export type ListEvent = {
  type: ActionEventType,
  data: List
}