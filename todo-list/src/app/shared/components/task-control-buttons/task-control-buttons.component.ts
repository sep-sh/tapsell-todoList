import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormMode, TaskEventType } from '../../enums/shared.enum';
import { ActionButtonsComponent, ActionButtonsEvent } from "../action-buttons/action-buttons.component";



@Component({
  selector: 'app-task-control-buttons',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, ActionButtonsComponent],
  templateUrl: './task-control-buttons.component.html',
  styleUrl: './task-control-buttons.component.scss',
  standalone: true,
})



export class TaskControlButtonsComponent {
  mode = input.required<FormMode>();
  hideMoveToDaily = input<boolean>(false);
  formMode = FormMode
  taskControlButtonsEvent = TaskEventType

  taskControlButtonEvent = output<TaskEventType>();

  handleAction(type: TaskEventType): void {
    this.taskControlButtonEvent.emit(type);
  }

  onActionButonsEvent(event: ActionButtonsEvent) {
    if (event === ActionButtonsEvent.SUBMIT) {
      this.taskControlButtonEvent.emit(TaskEventType.SUBMIT)


    }
    else if (event === ActionButtonsEvent.CANCEL) {
      this.taskControlButtonEvent.emit(TaskEventType.CANCEL)
    }
  }

}
