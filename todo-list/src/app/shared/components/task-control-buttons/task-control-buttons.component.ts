import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormMode, TaskEventType } from '../../enums/shared.enum';



@Component({
  selector: 'app-task-control-buttons',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule,],
  templateUrl: './task-control-buttons.component.html',
  styleUrl: './task-control-buttons.component.scss',
  standalone: true,
})



export class TaskControlButtonsComponent {
  mode = input.required<FormMode>();
  formMode = FormMode
  taskControlButtonsEvent = TaskEventType

  taskControlButtonEvent = output<TaskEventType>();

  handleAction(type: TaskEventType): void {
    this.taskControlButtonEvent.emit(type);
  }
}
