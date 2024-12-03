import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../../../shared/types/task.type';
import { DialogEvent } from '../../../../shared/enums/shared.enum';
@Component({
  selector: 'app-delete-completed-task-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './delete-completed-task-dialog.component.html',
  styleUrl: './delete-completed-task-dialog.component.scss',
  standalone: true
})
export class DeleteCompletedTaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteCompletedTaskDialogComponent>);
  readonly data = inject<Task>(MAT_DIALOG_DATA);
  completedTaskEnumEvent = DialogEvent

  closeDialog(event: DialogEvent) {
    this.dialogRef.close(event);
  }

}
