import { Component, effect, input, output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../../types/task.type';
import { ActionButtonsComponent, ActionButtonsEvent } from "../action-buttons/action-buttons.component";

enum NewTaskViewMode {
  VIEW, CREATE
}

@Component({
  selector: 'app-new-task',
  imports: [MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ActionButtonsComponent],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
  standalone: true
})
export class NewTaskComponent {
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


  public get acceptButtonDisabled(): boolean {
    return !this.taskForm.valid;
  }


  public onAddNewTaskClick(): void {
    this.mode.set(this.viewMode.CREATE)
  }


  onActionButonsEvent(event: ActionButtonsEvent) {
    if (event === ActionButtonsEvent.SUBMIT) {
      this.createNewTask.emit(this.taskForm.value)


    }
    else if (event === ActionButtonsEvent.CANCEL) {
      this.mode.set(this.viewMode.VIEW)
      this.taskForm.reset()
    }
  }
}
