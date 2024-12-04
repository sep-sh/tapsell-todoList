import { inject, signal, WritableSignal } from "@angular/core";
import { ITasksService } from "../interfaces/tasks-list.interface";
import { ListId, Task, TaskActionResult } from "../types/shared.type";
import { MatDialog } from "@angular/material/dialog";
import { DeleteTaskDialogComponent } from "../components/delete-dialog/delete-completed-task-dialog.component";
import { ActionStatus, DialogEvent, TaskEventType, TasksFetchMode } from "../enums/shared.enum";
import { SNACK_SUCCESS_MESSAGES } from "../constants/snack.constant";
import { TaskApiService } from "./http/task-api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, map, Observable, switchMap } from "rxjs";

export class TaskBaseService implements ITasksService {

  constructor(private taskApiService: TaskApiService) { }
  public tasks: WritableSignal<Task[]> = signal<Task[]>([]);
  private readonly dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);


  confirmAndDeleteTask(task: Task): Observable<TaskActionResult> {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      data: task
    });

    return dialogRef.afterClosed().pipe(
      switchMap((result: DialogEvent) => {
        if (result === DialogEvent.ACCEPT) {
          return this.deleteTask(task);
        }
        return EMPTY;
      })
    );
  }

  deleteTask(task: Task): Observable<TaskActionResult> {
    return this.taskApiService.deleteTaskById(task._id).pipe(
      map(() => {
        this._snackBar.open(SNACK_SUCCESS_MESSAGES.taskDeleted, 'ok!', {
          duration: 1500,
        });
        return { type: TaskEventType.DELETE, status: ActionStatus.SUCCESS };
      })
    );
  }

  setTasks(fetchMode: TasksFetchMode, listId?: ListId): void {
    if (fetchMode === TasksFetchMode.WITH_ID) {
      this.setTasksData(listId!)
    }
    else if (fetchMode === TasksFetchMode.COMPLETED) {
      this.setCompletedTasks()

    }
  }

  private setCompletedTasks() {
    this.taskApiService.getCompletedTasks().subscribe((tasks: Task[]) => {
      this.tasks.set(tasks)
    })
  }

  private setTasksData(listId: ListId): void {
    this.taskApiService.getTasksByListId(listId).subscribe((tasks: Task[]) => {
      this.tasks.set(tasks)
    })
  }

  createTask(task: Partial<Task>, listId: ListId): Observable<TaskActionResult> {
    const newTask = { ...task, list: listId };
    return this.taskApiService.postTask(newTask).pipe(
      map(() => {
        this._snackBar.open(SNACK_SUCCESS_MESSAGES.taskCreated, 'ok!', {
          duration: 1500,
        });
        return { type: TaskEventType.CREATE, status: ActionStatus.SUCCESS };
      })
    );
  }


  updateTask(task: Task): Observable<TaskActionResult> {
    return this.taskApiService.updateTaskById(task).pipe(
      map(() => {
        this._snackBar.open(SNACK_SUCCESS_MESSAGES.taskUpdated, 'ok!', {
          duration: 1500,
        });
        return { type: TaskEventType.EDIT, status: ActionStatus.SUCCESS };
      })
    );
  }


  moveTaskToDaily(task: Task, mainListId: ListId): Observable<TaskActionResult> {
    task.list = mainListId;
    return this.taskApiService.updateTaskById(task).pipe(
      map(() => {
        this._snackBar.open(SNACK_SUCCESS_MESSAGES.taskMovedToDaily, 'ok!', {
          duration: 1500,
        });
        return { type: TaskEventType.MOVE_TO_DAILY, status: ActionStatus.SUCCESS };
      })
    );
  }


}
