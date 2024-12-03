import { Component, effect, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Task, TaskEvent } from '../../types/task.type';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormMode, TaskEventType } from '../../enums/shared.enum';
import { FormInputComponent } from '../form-input/form-input.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskControlButtonsComponent } from '../task-control-buttons/task-control-buttons.component';

@Component({
  selector: 'app-task',
  imports: [
    MatCardModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormInputComponent,
    TaskControlButtonsComponent
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
  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: [],
      description: [],
      done: [],
      list: [],
      date: [],
    });

    effect(() => {
      const taskValue = this.task();
      if (taskValue) {
        this.taskForm.patchValue(taskValue);
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
