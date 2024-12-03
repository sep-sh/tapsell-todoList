import { inject, Injectable, signal } from '@angular/core';
import { TaskApiService } from '../../../shared/services/http/task-api.service';
import { Task } from '../../../shared/types/task.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskDialogComponent } from '../../../shared/components/delete-task-dialog/delete-completed-task-dialog.component';
import { DialogEvent } from '../../../shared/enums/shared.enum';

@Injectable({
  providedIn: 'root'
})

export class CompletedListService {
  public readonly completedTasks = signal<Task[]>([]);
  private _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);

  constructor(private taskApiService: TaskApiService) { }

  public fetchPageData(): void {
    this.taskApiService.getCompletedTasks().subscribe((tasks: Task[]) => {
      this.completedTasks.set(tasks)
    })
  }

  public onDeleteTask(task: Task): void {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      data: task
    });

    dialogRef.afterClosed().subscribe((result: DialogEvent) => {
      if (result === DialogEvent.ACCEPT) {
        this.deleteTask(task)
      }
    });
  }


  private deleteTask(task: Task): void {
    this.taskApiService.deleteTaskById(task._id).subscribe((res: Task) => {
      this._snackBar.open('Task deleted Succesfully!', 'ok!', {
        duration: 1500,
      });
      this.fetchPageData()
    })
  }
}
