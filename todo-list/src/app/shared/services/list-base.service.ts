import { WritableSignal, inject, signal } from "@angular/core";
import { IListsService } from "../interfaces/tasks-list.interface";
import { ListsService } from "../../core/services/lists.service";
import { SNACK_SUCCESS_MESSAGES } from "../constants/snack.constant";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ActionStatus, DialogEvent, ListEventType } from "../enums/shared.enum";
import { List, ListActionResult, ListId } from "../types/shared.type";
import { NewListDialogService } from "./new-list-dialog.service";
import { DeleteTaskDialogComponent } from "../components/delete-dialog/delete-completed-task-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { EMPTY, map, Observable, switchMap, tap } from "rxjs";


export class BaseListService implements IListsService {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private listsService
  private router
  private newListDialogService
  public list: WritableSignal<List | null> = signal<List | null>(null);
  public currentPageListId: WritableSignal<ListId | null> = signal<ListId | null>(null);
  public mainList: WritableSignal<List | undefined>

  constructor(
    listsService: ListsService,
    router: Router,
    newListDialogService: NewListDialogService,) {
    this.listsService = listsService
    this.router = router
    this.newListDialogService = newListDialogService
    this.mainList = this.listsService.mainList

  }


  setLists(listId: ListId) {
    this.currentPageListId.set(listId)
    if (!this.currentPageListId()) { return }
    this.listsService.getListById(this.currentPageListId()!).subscribe((list: List) => {
      this.list.set(list)
    })
  }


  confirmAndDeleteList(list: List): Observable<ListActionResult> {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      data: list
    });
    return dialogRef.afterClosed().pipe(
      switchMap((result: DialogEvent) => {
        if (result === DialogEvent.ACCEPT) {
          return this.deleteList(list);
        }
        return EMPTY;
      })
    );
  }



  public deleteList(list: List): Observable<ListActionResult> {
    return this.listsService.deleteListById(list._id).pipe(
      tap(() => {
        this.handleSnackMessage(SNACK_SUCCESS_MESSAGES.listDeleted);
        this.router.navigate(['']);
      }),
      map(() => ({
        type: ListEventType.DELETE,
        status: ActionStatus.SUCCESS,
      }))
    );
  }


  updateList(list: List): Observable<ListActionResult> {
    return this.listsService.updateListById(list).pipe(
      tap(() => {
        this.handleSnackMessage(SNACK_SUCCESS_MESSAGES.listUpdated);
      }),
      map(() => ({
        type: ListEventType.UPDATE,
        status: ActionStatus.SUCCESS,
      }))
    );
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
