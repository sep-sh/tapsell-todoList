import { ActionStatus, ListEventType, TaskEventType } from "../enums/shared.enum"

export type ListActionResult = {
    type: ListEventType,
    status: ActionStatus
}

export type TaskActionResult = {
    type: TaskEventType,
    status: ActionStatus
}