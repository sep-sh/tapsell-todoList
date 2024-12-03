export type List = {
  title: string;
  _id: string;
  date: Date;
  __v: number;
  isMain?: boolean;
};


export type ListId = List['_id'];