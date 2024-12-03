import { Component, inject, OnInit, signal } from '@angular/core';
import { Task } from '../../shared/types/task.type';
import { CompletedListService } from './services/completed-list.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DeleteCompletedTaskDialogComponent } from './components/delete-completed-task-dialog/delete-completed-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEvent } from '../../shared/enums/shared.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-completed-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './completed-list.component.html',
  styleUrl: './completed-list.component.scss',
  standalone: true,
})
export class CompletedListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'delete']
  readonly completedTasks = signal<Task[]>([]);
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  constructor(private service: CompletedListService) { }


  public ngOnInit(): void {
    this.getCompletedTasks()
  }

  public onDeleteTaskButtonClick(task: Task): void {
    const dialogRef = this.dialog.open(DeleteCompletedTaskDialogComponent, {
      data: task
    });

    dialogRef.afterClosed().subscribe((result: DialogEvent) => {
      if (result === DialogEvent.ACCEPT) {
        this.deleteTask(task)
      }
    });
  }

  private deleteTask(task: Task) {
    this.service.deleteTask(task).subscribe((res: Task) => {
      console.log('res', res)
      this._snackBar.open('Task deleted Succesfully!', 'ok!', {
        duration: 1500,
      });
      this.getCompletedTasks()
    })
  }

  private getCompletedTasks(): void {
    this.service.getCompletedTasks().subscribe((tasks: Task[]) => {
      this.completedTasks.set(tasks);
    });

  }



}
