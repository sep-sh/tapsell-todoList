import { Injectable } from '@angular/core';
import { ListsService } from '../../../shared/services/lists.service';
import { Router } from '@angular/router';
import { NewListDialogService } from '../../../shared/services/new-list-dialog.service';
import { BaseListService } from '../../../shared/services/list-base.service';

@Injectable({
  providedIn: 'root'
})
export class MainListListService extends BaseListService {
  constructor(
    listsService: ListsService,
    router: Router,
    newListDialogService: NewListDialogService
  ) {
    super(listsService, router, newListDialogService);
  }

}
