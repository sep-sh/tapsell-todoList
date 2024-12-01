import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListApiService {
  baseUrl: string = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  getAllLists(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/lists`);
  }
}
