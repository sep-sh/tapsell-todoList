import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEvent } from '../enums/shared.enum';
import { NewListDialogComponent } from '../components/new-list-dialog/new-list-dialog.component';
import { ListsService } from '../../core/services/lists.service';
import { NewListDialog } from '../types/shared.type';

@Injectable()
export class NewListDialogService {
  readonly dialog = inject(MatDialog);


  constructor(private listsServie: ListsService) { }

  open() {
    const dialogRef = this.dialog.open(NewListDialogComponent, {
    });

    dialogRef.afterClosed().subscribe((result: NewListDialog) => {
      if (result.event === DialogEvent.ACCEPT) {
        this.listsServie.createNewList(result.data)
      }
    });

  }
}
