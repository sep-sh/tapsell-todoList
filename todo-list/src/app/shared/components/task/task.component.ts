import { Component, effect, input, output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task, TaskEvent } from '../../types/task.type';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormMode, ActionEventType } from '../../enums/shared.enum';
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
  taskDefaultValues = signal<Task | null>(null)
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
        this.taskDefaultValues.set(this.task())
        this.taskForm.patchValue(this.task());
      }
    });
  }


  onTaskControlButtonsEvent(event: ActionEventType): void {
    switch (event) {
      case ActionEventType.DELETE:
        this.taskEvent.emit({ type: event, data: this.taskForm.value })
        break;

      case ActionEventType.EDIT:
        this.mode = FormMode.EDIT;
        break;

      case ActionEventType.MOVE_TO_DAILY:
        this.taskEvent.emit({ type: event, data: this.taskForm.value })
        break;

      case ActionEventType.CANCEL:
        this.taskForm.patchValue(this.taskDefaultValues()!)
        this.mode = FormMode.VIEW
        break;

      case ActionEventType.SUBMIT:
        this.mode = FormMode.VIEW
        this.taskEvent.emit({ type: event, data: this.taskForm.value })
        break;

    }
  }

}
