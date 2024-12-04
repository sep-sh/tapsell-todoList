import { inject, signal, WritableSignal } from "@angular/core";
import { ITasksService } from "../interfaces/tasks-list.interface";
import { TaskActionResult } from "../types/shared.type";
import { Task } from "../types/task.type";
import { MatDialog } from "@angular/material/dialog";
import { DeleteTaskDialogComponent } from "../components/delete-task-dialog/delete-completed-task-dialog.component";
import { ActionStatus, DialogEvent, TaskEventType } from "../enums/shared.enum";
import { SNACK_MESSAGES } from "../constants/snack.constant";
import { TaskApiService } from "./http/task-api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ListId } from "../types/list.type";

export class TaskBaseService implements ITasksService {

  constructor(private taskApiService: TaskApiService) { }
  public tasks: WritableSignal<Task[]> = signal<Task[]>([]);
  public actionCompleted: WritableSignal<TaskActionResult | null> = signal<TaskActionResult | null>(null);
  private readonly dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);


  confirmAndDeleteTask(task: Task): void {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      data: task
    });
    dialogRef.afterClosed().subscribe((result: DialogEvent) => {
      if (result === DialogEvent.ACCEPT) {
        this.deleteTask(task)
      }
    });
  }


  public deleteTask(task: Task) {
    this.taskApiService.deleteTaskById(task._id).subscribe((result: Task) => {
      this._snackBar.open(SNACK_MESSAGES.taskDeleted, 'ok!', {
        duration: 1500,
      });
      this.actionCompleted.set({ type: TaskEventType.DELETE, status: ActionStatus.SUCCESS });

    })
  }

  initialize(listId: ListId): void {
    this.setTasksData(listId)
  }

  fetchTasks(): void {

  }

  private setTasksData(listId: ListId): void {
    this.taskApiService.getTasksByListId(listId).subscribe((tasks: Task[]) => {
      this.tasks.set(tasks)
    })
  }



  createTask(task: Partial<Task>, listId: ListId): void {
    const newTask = { ...task, list: listId }
    this.taskApiService.postTask(newTask).subscribe(task => {
      this._snackBar.open(SNACK_MESSAGES.taskCreated, 'ok!', {
        duration: 1500,
      });

      this.actionCompleted.set({ type: TaskEventType.CREATE, status: ActionStatus.SUCCESS });

    })
  }


  public updateTask(task: Task): void {
    this.taskApiService.updateTaskById(task).subscribe((result: Task) => {
      this._snackBar.open(SNACK_MESSAGES.taskUpdated, 'ok!', {
        duration: 1500,
      });
      this.actionCompleted.set({ type: TaskEventType.EDIT, status: ActionStatus.SUCCESS });

    })
  }


  moveTaskToDaily(task: Task, mainListId: ListId): void {
    task.list = mainListId
    this.taskApiService.updateTaskById(task).subscribe((result: Task) => {
      this._snackBar.open(SNACK_MESSAGES.taskMovedToDaily, 'ok!', {
        duration: 1500,
      });
      this.actionCompleted.set({ type: TaskEventType.MOVE_TO_DAILY, status: ActionStatus.SUCCESS });

    })
  }


}
