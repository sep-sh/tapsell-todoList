import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogEvent } from '../../enums/shared.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-new-list-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './new-list-dialog.component.html',
  styleUrl: './new-list-dialog.component.scss',
  standalone: true
})
export class NewListDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewListDialogComponent>);
  dialogEvent = DialogEvent
  newListForm: FormGroup
  constructor(private fb: FormBuilder) {
    this.newListForm = this.fb.group({
      title: ['New List', Validators.required]
    })
  }

  closeDialog(event: DialogEvent) {
    this.dialogRef.close({ event: event, data: this.newListForm.value });
  }

  public get acceptButtonDisabled(): boolean {
    return !this.newListForm.valid;
  }

}
