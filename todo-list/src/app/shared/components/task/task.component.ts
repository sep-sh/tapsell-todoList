import { Component, SkipSelf, effect, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Task } from '../../types/task.type';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormMode } from '../../enums/shared.enum';
import { FormInputComponent } from '../form-input/form-input.component';
import { MatTooltipModule } from '@angular/material/tooltip';

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
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',

  standalone: true,
})
export class TaskComponent {
  task = input.required<Task>();
  taskForm: FormGroup;
  mode: FormMode = FormMode.VIEW;
  modeEnum = FormMode;
  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      done: [false],
      list: ['', Validators.required],
      date: [new Date()],
    });

    effect(() => {
      const taskValue = this.task();
      if (taskValue) {
        console.log('taskValue', taskValue);
        this.taskForm.patchValue(taskValue);
      }
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const updatedTask = this.taskForm.value as Task;
      console.log('Updated Task Submitted:', updatedTask);
    }
  }

  changeView() {
    if (this.mode === this.modeEnum.VIEW) {
      this.mode = this.modeEnum.EDIT;
    } else {
      this.mode = this.modeEnum.VIEW;
    }
  }

  get descriptionControl(): FormControl {
    return this.taskForm.get('description') as FormControl;
  }
}
