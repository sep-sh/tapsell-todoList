import { Component, input, OnChanges, output, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from "../form-input/form-input.component";
import { TaskEventType, FormMode, ActionStatus } from '../../enums/shared.enum';
import { ActionButtonsComponent, ActionButtonsEvent } from "../action-buttons/action-buttons.component";
import { List, ListActionResult, ListEvent } from '../../types/shared.type';
import { MatTooltipModule } from '@angular/material/tooltip';




@Component({
  selector: 'app-list-header',
  imports: [MatToolbarModule, MatTooltipModule, MatButtonModule, MatIconModule, FormInputComponent, ReactiveFormsModule, ActionButtonsComponent],
  templateUrl: './list-header.component.html',
  styleUrl: './list-header.component.scss',
  standalone: true
})
export class ListHeaderComponent implements OnChanges {
  public readonly mode: WritableSignal<FormMode> = signal(FormMode.VIEW);
  public showCreateNewList = input<boolean>(false);
  public listActionCompleted = input<ListActionResult | null>();

  public list = input.required<List>();
  public onListEvent = output<ListEvent>()
  public onAddNewListEvent = output()
  private listDefaulValues = signal<List | null>(null)
  public formMode = FormMode
  public listForm: FormGroup


  constructor(private fb: FormBuilder) {
    this.listForm = this.fb.group({
      title: ['', Validators.required],
      _id: [],
      date: [],
      isMain: [],

    })

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['list']) {
      if (this.list()) {
        this.listDefaulValues.set(this.list())
        this.listForm.patchValue(this.list());
      }
    }
    else if (changes['listActionCompleted']) {
      if (this.listActionCompleted()) {
        this.handleActionComplete()
      }

    }
  }

  handleActionComplete() {
    if (this.listActionCompleted()?.status === ActionStatus.SUCCESS) {
      this.listForm.reset()
      this.mode.set(this.formMode.VIEW)

    }
  }

  onAddNewListButton() {
    this.onAddNewListEvent.emit()
  }

  onDeleteButtonClick() {
    this.onListEvent.emit({ type: TaskEventType.DELETE, data: this.listForm.value })
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
      this.onListEvent.emit({ type: TaskEventType.SUBMIT, data: this.listForm.value })
    }
  }

  public get acceptButtonDisabled(): boolean {
    return !this.listForm.valid;
  }



}
