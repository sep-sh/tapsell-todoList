import { WritableSignal, inject, signal } from "@angular/core";
import { IListsService } from "../interfaces/tasks-list.interface";
import { List, ListId } from "../types/list.type";
import { ListsService } from "./lists.service";
import { SNACK_MESSAGES } from "../constants/snack.constant";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ActionStatus, DialogEvent, ListEventType } from "../enums/shared.enum";
import { ListActionResult } from "../types/shared.type";
import { NewListDialogService } from "./new-list-dialog.service";
import { DeleteTaskDialogComponent } from "../components/delete-task-dialog/delete-completed-task-dialog.component";
import { MatDialog } from "@angular/material/dialog";


export class BaseListService implements IListsService {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private listsService
  private router
  private newListDialogService
  public list: WritableSignal<List | null> = signal<List | null>(null);
  public currentPageListId: WritableSignal<ListId | null> = signal<ListId | null>(null);
  public mainList: WritableSignal<List | undefined>
  public actionCompleted: WritableSignal<ListActionResult | null> = signal<ListActionResult | null>(null);

  constructor(
    listsService: ListsService,
    router: Router,
    newListDialogService: NewListDialogService,) {
    this.listsService = listsService
    this.router = router
    this.newListDialogService = newListDialogService
    this.mainList = this.listsService.mainList

  }


  initialize(listId: ListId) {
    this.currentPageListId.set(listId)
    if (!this.currentPageListId()) { return }
    this.listsService.getListById(this.currentPageListId()!).subscribe((list: List) => {
      this.list.set(list)
    })
  }

  fetchList(): void {
    throw new Error("Method not implemented.");
  }





  confirmAndDeleteList(list: List): void {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      data: list
    });
    dialogRef.afterClosed().subscribe((result: DialogEvent) => {
      if (result === DialogEvent.ACCEPT) {
        this.deleteList(list)
      }
    });
  }

  public deleteList(list: List) {
    this.listsService.deleteListById(list._id).subscribe((list: List) => {
      this.handleSnackMessage(SNACK_MESSAGES.listDeleted);
      this.router.navigate(['']);
      this.actionCompleted.set({ type: ListEventType.DELETE, status: ActionStatus.SUCCESS });
    });

  }

  updateList(list: List): void {
    this.listsService.updateListById(list).subscribe((list: List) => {
      this.handleSnackMessage(SNACK_MESSAGES.listUpdated);
      this.actionCompleted.set({ type: ListEventType.UPDATE, status: ActionStatus.SUCCESS });
    });
  }

  createList(): void {
    this.newListDialogService.open()
  }

  private handleSnackMessage(message: string, action: string = 'ok!', duration: number = 1500): void {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }

}
