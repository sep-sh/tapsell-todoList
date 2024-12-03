import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { List } from '../../types/list.type';

@Injectable({
  providedIn: 'root',
})
export class ListApiService {
  baseUrl: string = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getAllLists(): Observable<List[]> {
    return this.httpClient.get<List[]>('/api/lists')
  }


  public getListById(listId: string): Observable<List> {
    return this.httpClient.get<List>(`/api/lists/${listId}`)
  }

  public updateListById(list: List): Observable<List> {
    return this.httpClient.put<List>(`/api/lists/${list._id}`, list)
  }

  public deleteListById(listId: string): Observable<List> {
    return this.httpClient.delete<List>(`/api/lists/${listId}`)
  }

}
