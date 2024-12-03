import { Component, effect, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task, TaskEvent } from '../../types/task.type';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormMode, TaskEventType } from '../../enums/shared.enum';
import { FormInputComponent } from '../form-input/form-input.component';
import { TaskControlButtonsComponent } from '../task-control-buttons/task-control-buttons.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-task',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormInputComponent,
    TaskControlButtonsComponent,
    MatCheckboxModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',

  standalone: true,
})
export class TaskComponent {
  task = input.required<Task>();
  taskEvent = output<TaskEvent>()
  taskForm: FormGroup;
  mode: FormMode = FormMode.VIEW;
  viewModes = FormMode
  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      _id: [],
      title: [],
      description: [],
      done: [],
      list: [],
      date: [],
    })
    effect(() => {
      if (this.task()) {
        this.taskForm.patchValue(this.task());
      }
    });
  }


  onTaskControlButtonsEvent(event: TaskEventType): void {
    switch (event) {
      case TaskEventType.DELETE:
        this.taskEvent.emit({ type: event, data: this.taskForm.value })
        break;

      case TaskEventType.EDIT:
        this.mode = FormMode.EDIT;
        break;

      case TaskEventType.MOVE_TO_DAILY:
        this.taskEvent.emit({ type: event, data: this.taskForm.value })
        break;

      case TaskEventType.CANCEL:
        this.mode = FormMode.VIEW
        break;

      case TaskEventType.SUBMIT:
        this.mode = FormMode.VIEW
        this.taskEvent.emit({ type: event, data: this.taskForm.value })
        break;

    }
  }

}
