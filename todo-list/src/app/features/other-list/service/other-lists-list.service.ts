import { Injectable } from '@angular/core';
import { BaseListService } from '../../../shared/services/list-base.service';
import { ListsService } from '../../../shared/services/lists.service';
import { NewListDialogService } from '../../../shared/services/new-list-dialog.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OtherListsListService extends BaseListService {
  constructor(
    listsService: ListsService,
    router: Router,
    newListDialogService: NewListDialogService
  ) {
    super(listsService, router, newListDialogService);
  }


}