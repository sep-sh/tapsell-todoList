export enum FormMode {
  EDIT,
  VIEW,
}
export enum TaskEventType {
  DELETE,
  EDIT,
  MOVE_TO_DAILY,
  CANCEL,
  SUBMIT,
  STATUS_CHANGE,
  CREATE,
}
export enum DialogEvent {
  ACCEPT,
  CANCEL
}
export enum ListEventType {
  FETCH,
  DELETE,
  UPDATE,
  CREATE,
}
export enum ActionStatus {
  ERROR,
  SUCCESS
}

export enum TasksFetchMode {
  COMPLETED,
  WITH_ID
}
