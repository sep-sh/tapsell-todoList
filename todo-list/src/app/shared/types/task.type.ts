export interface Task {
  _id: string;
  title: string;
  description: string;
  done: boolean;
  list: string;
  date: Date;
  __v: number;
}
