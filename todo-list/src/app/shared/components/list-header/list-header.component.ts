import { Component, effect, input, output, signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { List, ListEvent } from '../../types/list.type';
import { FormInputComponent } from "../form-input/form-input.component";
import { ActionEventType, FormMode } from '../../enums/shared.enum';
import { ActionButtonsComponent, ActionButtonsEvent } from "../action-buttons/action-buttons.component";




@Component({
  selector: 'app-list-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, FormInputComponent, ReactiveFormsModule, ActionButtonsComponent],
  templateUrl: './list-header.component.html',
  styleUrl: './list-header.component.scss',
  standalone: true
})
export class ListHeaderComponent {
  public resetListForm = input.required<boolean>();
  List = input.required<List>();
  onListEvent = output<ListEvent>()

  public readonly mode: WritableSignal<FormMode> = signal(FormMode.VIEW);
  listDefaulValues = signal<List | null>(null)
  formMode = FormMode
  listForm: FormGroup


  constructor(private fb: FormBuilder) {
    this.listForm = this.fb.group({
      title: ['', Validators.required],
      _id: [],
      date: [],
      isMain: [],

    })
    effect(() => {
      this.resetListForm()
      this.listForm.reset()
      this.mode.set(this.formMode.VIEW)
    });


    effect(() => {
      if (this.List()) {
        this.listDefaulValues.set(this.List())
        this.listForm.patchValue(this.List());
      }
    });
  }

  onDeleteButtonClick() {
    this.onListEvent.emit({ type: ActionEventType.DELETE, data: this.listForm.value })
  }


  onEditButtonClick() {
    this.mode.set(this.formMode.EDIT)

  }
  onActionButonsEvent(action: ActionButtonsEvent) {
    if (action === ActionButtonsEvent.CANCEL) {
      this.listForm.patchValue(this.listDefaulValues()!)
      this.mode.set(this.formMode.VIEW)
    }
    else if (action === ActionButtonsEvent.SUBMIT) {
      this.onListEvent.emit({ type: ActionEventType.SUBMIT, data: this.listForm.value })
    }
  }

  public get acceptButtonDisabled(): boolean {
    return !this.listForm.valid;
  }



}
