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
import { DialogEvent } from '../../enums/shared.enum';
import { List, Task } from '../../types/shared.type';
@Component({
  selector: 'app-delete-completed-task-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './delete-completed-task-dialog.component.html',
  styleUrl: './delete-completed-task-dialog.component.scss',
  standalone: true
})
export class DeleteTaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteTaskDialogComponent>);
  readonly data = inject<Task | List>(MAT_DIALOG_DATA);
  dialogEvent = DialogEvent

  closeDialog(event: DialogEvent) {
    this.dialogRef.close(event);
  }

}
