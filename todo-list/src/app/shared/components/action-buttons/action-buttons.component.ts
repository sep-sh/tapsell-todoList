import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
export enum ActionButtonsEvent {
  CANCEL, SUBMIT
}

@Component({
  selector: 'app-action-buttons',
  imports: [MatButtonModule,
    MatIconModule,
    MatTooltipModule,],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss',
  standalone: true
})
export class ActionButtonsComponent {
  public onAction = output<ActionButtonsEvent>()
  public acceptButtonDisabled = input<boolean>();
  buttonEvents = ActionButtonsEvent

  public onButtonsAction(action: ActionButtonsEvent): void {
    this.onAction.emit(action)

  }


}
