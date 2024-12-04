import { Injectable, signal } from '@angular/core';
import { List, ListId } from '../../shared/types/list.type';
import { ListApiService } from '../../shared/services/http/list-api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  otherLists = signal<List[]>([])
  mainList = signal<List | undefined>(undefined)

  constructor(private listApiService: ListApiService) {
    this.fetchLists()
  }

  createNewList(list: Partial<List>) {
    this.listApiService.createNewList(list).subscribe((list: List) => {
      this.fetchLists()
    })
  }

  fetchLists() {
    this.listApiService.getAllLists().subscribe((lists: List[]) => {
      const mainList = lists.find((list: List) => list.isMain)
      this.mainList.set(mainList)
      const otherLists = lists.filter((list: List) => !list.isMain)
      this.otherLists.set(otherLists)
    })
  }

  public getListById(listId: ListId): Observable<List> {
    return this.listApiService.getListById(listId)
  }

  public deleteListById(listId: ListId): Observable<List> {
    return this.listApiService.deleteListById(listId).pipe(
      tap(() => this.fetchLists())
    );
  }

  public updateListById(list: List): Observable<List> {
    return this.listApiService.updateListById(list).pipe(
      tap(() => this.fetchLists())
    );
  }


}
