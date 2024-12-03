import { Component, effect, input, OnChanges, output, Signal, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Task } from '../../types/task.type';

enum NewTaskViewMode {
  VIEW, CREATE
}

@Component({
  selector: 'app-new-task',
  imports: [MatCardModule,
    MatButtonModule, MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
  standalone: true
})
export class NewTaskComponent implements OnChanges {
  public createNewTask = output<Partial<Task>>()
  public resetCreateTaskForm = input.required<boolean>();
  public taskForm: FormGroup
  public viewMode = NewTaskViewMode
  public readonly mode: WritableSignal<NewTaskViewMode> = signal(NewTaskViewMode.VIEW);


  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    })

    effect(() => {
      this.resetCreateTaskForm()
      this.taskForm.reset()
      this.mode.set(this.viewMode.VIEW)
    });


  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)

  }

  public onCancelButtonClicked(): void {
    this.mode.set(this.viewMode.VIEW)
    this.taskForm.reset()
  }

  public onSubmitButtonClicked(): void {
    this.createNewTask.emit(this.taskForm.value)
  }

  public get acceptButtonDisabled(): boolean {
    return !this.taskForm.valid;
  }


  public onAddNewTaskClick(): void {
    this.mode.set(this.viewMode.CREATE)
  }
}
