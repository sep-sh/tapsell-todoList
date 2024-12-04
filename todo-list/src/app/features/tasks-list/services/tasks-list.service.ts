import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TaskApiService } from '../../../shared/services/http/task-api.service';
import { Task } from '../../../shared/types/task.type';
import { List, ListId } from '../../../shared/types/list.type';
import { Observable,  } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskDialogComponent } from '../../../shared/components/delete-task-dialog/delete-completed-task-dialog.component';
import { DialogEvent } from '../../../shared/enums/shared.enum';
import { Router } from '@angular/router';
import { ListsService } from '../../../shared/services/lists.service';

const SNACK_MESSAGES = {
  taskMovedToDaily: 'Task Moved To Daily List!',
  taskDeleted: 'Task deleted Succesfully!',
  taskUpdated: 'Task Updated Succesfully!',
  taskCreated: 'Task Created Succesfully!',
  listUpdated: 'List Updated Succesfully!',
  listDeleted: 'List deleted Succesfully!',
}

@Injectable({
  providedIn: 'root'
})
export class TasksListService {
  private readonly dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);
  public tasks: WritableSignal<Task[]> = signal<Task[]>([]);
  public list: WritableSignal<List | null> = signal<List | null>(null);
  public currentPageListId: WritableSignal<ListId | null> = signal<ListId | null>(null);
  public resetCreateTaskForm: WritableSignal<boolean> = signal<boolean>(false);
  public resetListForm: WritableSignal<boolean> = signal<boolean>(false);
  readonly otherLists: Signal<List[]>;
  readonly mainList: Signal<List | undefined>;

  constructor(private taskApiService: TaskApiService,
    private router: Router,
    private listsService: ListsService) {


    this.otherLists = this.listsService.otherLists
    this.mainList = this.listsService.mainList

  }


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

  private deleteTask(task: Task, snackMessage: string): void {
    this.taskApiService.deleteTaskById(task._id).subscribe((result: Task) => {
      this._snackBar.open('Task deleted Succesfully!', 'ok!', {
        duration: 1500,
      });
      this.setTasksData()

    })
  }



  public onCreateNewTaskEvent(task: Partial<Task>) {
    const newTask = { ...task, list: this.currentPageListId()! }
    this.createNewTask(newTask).subscribe(task => {
      this._snackBar.open(SNACK_MESSAGES.taskCreated, 'ok!', {
        duration: 1500,
      });
      this.setTasksData()
      this.resetCreateTaskForm.set(!this.resetCreateTaskForm())

    })
  }

  public onDeleteListEvent(list: List) {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      data: list
    });
    dialogRef.afterClosed().subscribe((result: DialogEvent) => {
      if (result === DialogEvent.ACCEPT) {
        console.log('result', result)
        this.deleteList(list, SNACK_MESSAGES.listDeleted)
      }
    });


  }
  public onUpdateListEvent(list: List) {
    this.updateList(list)

  }

  public onUpdateTaskEvent(task: Task) {
    this.updateTask(task, SNACK_MESSAGES.taskUpdated)

  }

  public onMoveToDailyEvent(task: Task) {
    task.list = this.mainList()?._id!
    this.updateTask(task, SNACK_MESSAGES.taskMovedToDaily)

  }

  private setTasksData(): void {
    this.taskApiService.getTasksByListId(this.currentPageListId()!).subscribe((tasks: Task[]) => {
      this.tasks.set(tasks)
    })
  }

  private setListData(): void {
    this.listsService.getListById(this.currentPageListId()!).subscribe((list: List) => {
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

 
  private deleteList(list: List, snackMessage: string): void {
    this.listsService.deleteListById(list._id).subscribe((list: List) => {
      this._snackBar.open(snackMessage, 'ok!', {
        duration: 1500,
      });
      this.router.navigate(['']);
    })
  }
  private updateList(list: List): void {
    this.listsService.updateListById(list).subscribe((list: List) => {
      this._snackBar.open(SNACK_MESSAGES.listUpdated, 'ok!', {
        duration: 1500,
      });
      this.setListData()

      this.resetListForm.set(!this.resetListForm())
    })

  }

}
