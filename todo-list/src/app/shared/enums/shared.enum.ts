export enum FormMode {
  EDIT,
  VIEW,
  CREATE
}


export enum TaskEventType {
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  MOVE_TO_DAILY = 'MOVE_TO_DAILY',
  CANCEL = 'CANCEL',
  SUBMIT = 'SUBMIT',
  STATUS_CHANGE = 'DONE'
}

export enum DialogEvent {
  ACCEPT,
  CANCEL

}