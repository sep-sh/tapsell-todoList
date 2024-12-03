import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TaskApiService } from '../../../shared/services/http/task-api.service';
import { ListApiService } from '../../../shared/services/http/list-api.service';
import { Task } from '../../../shared/types/task.type';
import { List, ListId } from '../../../shared/types/list.type';
import { Observable, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskDialogComponent } from '../../../shared/components/delete-task-dialog/delete-completed-task-dialog.component';
import { DialogEvent } from '../../../shared/enums/shared.enum';

const SNACK_MESSAGES = {
  taskMovedToDaily: 'Task Moved To Daily List!',
  taskDeleted: 'Task deleted Succesfully!',
  taskUpdated: 'Task Updated Succesfully!',
  taskCreated: 'Task Created Succesfully!'
}

@Injectable({
  providedIn: 'root'
})
export class TasksListService {
  private readonly dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);
  public tasks: WritableSignal<Task[]> = signal<Task[]>([]);
  public list: WritableSignal<List | null> = signal<List | null>(null);
  public listId: WritableSignal<ListId | null> = signal<ListId | null>(null);
  public mainList: WritableSignal<List | null> = signal<List | null>(null);
  public resetCreateTaskForm: WritableSignal<boolean> = signal<boolean>(false);


  constructor(private taskApiService: TaskApiService, private listApiService: ListApiService) { }


  public fetchPageData(): void {
    this.setListData()
    this.setTasksData()

  }

  public onDeleteTaskEvent(task: Task) {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      data: task
    });
    dialogRef.afterClosed().subscribe((result: DialogEvent) => {
      if (result === DialogEvent.ACCEPT) {
        this.deleteTask(task, SNACK_MESSAGES.taskDeleted)
      }
    });
  }

  public onCreateNewTaskEvent(task: Partial<Task>) {
    const newTask = { ...task, list: this.listId()! }
    this.createNewTask(newTask).subscribe(task => {
      this._snackBar.open(SNACK_MESSAGES.taskCreated, 'ok!', {
        duration: 1500,
      });
      this.setTasksData()
      this.resetCreateTaskForm.set(!this.resetCreateTaskForm())

    })

  }

  public onUpdateTaskEvent(task: Task) {
    this.updateTask(task, SNACK_MESSAGES.taskUpdated)

  }

  public onMoveToDailyEvent(task: Task) {
    this.getDailyListId().subscribe((mainList: List) => {
      task.list = mainList._id
      this.updateTask(task, SNACK_MESSAGES.taskMovedToDaily)
    })
  }


  private getDailyListId(): Observable<List> {
    if (this.mainList()) {
      return of(this.mainList()!);
    } else {
      return this.listApiService.getMainList().pipe(
        tap((list: List) => this.mainList.set(list))
      );
    }
  }



  private setTasksData(): void {
    this.taskApiService.getTasksByListId(this.listId()!).subscribe((tasks: Task[]) => {
      this.tasks.set(tasks)
    })
  }

  private setListData(): void {
    this.listApiService.getListById(this.listId()!).subscribe((list: List) => {
      this.list.set(list)
    })
  }

  createNewTask(task: Partial<Task>): Observable<Task> {
    return this.taskApiService.postTask(task)
  }

  private updateTask(task: Task, snackMessage: string): void {
    this.taskApiService.updateTaskById(task).subscribe((result: Task) => {
      this._snackBar.open(snackMessage, 'ok!', {
        duration: 1500,
      });
      this.setTasksData()
    })
  }

  private deleteTask(task: Task, snackMessage: string): void {
    this.taskApiService.deleteTaskById(task._id).subscribe((result: Task) => {
      this._snackBar.open('Task deleted Succesfully!', 'ok!', {
        duration: 1500,
      });
      this.setTasksData()

    })
  }

  moveTaskToDailyList(task: Task) {
    // TODO
    // this.taskApiService.
  }


}
