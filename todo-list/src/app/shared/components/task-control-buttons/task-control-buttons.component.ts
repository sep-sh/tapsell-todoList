import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormMode } from '../../enums/shared.enum';

@Component({
  selector: 'app-task-control-buttons',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './task-control-buttons.component.html',
  styleUrl: './task-control-buttons.component.scss',
  standalone: true,
})
export class TaskControlButtonsComponent {
  mode = input.required<FormMode>();
  onEditCanceled = output<boolean>();
  onEditButtonClicked = output<boolean>();
  onDeleteButtonClicked = output<boolean>();
  onMoveToDailyButtonClicked = output<boolean>();
}
