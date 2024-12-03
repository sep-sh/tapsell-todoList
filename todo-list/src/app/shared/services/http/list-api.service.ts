import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List, ListId } from '../../types/list.type';

@Injectable({
  providedIn: 'root',
})
export class ListApiService {
  constructor(private httpClient: HttpClient) { }

  public getAllLists(): Observable<List[]> {
    return this.httpClient.get<List[]>('/api/lists')
  }
  public getMainList(): Observable<List> {
    return this.httpClient.get<List>('/api/mainList')
  }


  public getListById(listId: ListId): Observable<List> {
    return this.httpClient.get<List>(`/api/lists/${listId}`)
  }

  public updateListById(list: List): Observable<List> {
    return this.httpClient.put<List>(`/api/lists/${list._id}`, list)
  }

  public deleteListById(listId: ListId): Observable<List> {
    return this.httpClient.delete<List>(`/api/lists/${listId}`)
  }

}
