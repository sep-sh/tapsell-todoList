import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListId, Task, TaskId } from '../../types/shared.type';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  constructor(private http: HttpClient) { }



  public getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('api/tasks');
  }

  public getTasksByListId(listId: ListId): Observable<Task[]> {
    return this.http.get<Task[]>(`api/tasks/query/${listId}`);
  }

  public getTaskById(taskId: TaskId): Observable<Task> {
    return this.http.get<Task>(`api/tasks/${taskId}`);
  }


  public updateTaskById(task: Task): Observable<Task> {
    return this.http.put<Task>(`api/tasks/${task._id}`, task);
  }


  public deleteTaskById(taskId: TaskId): Observable<Task> {
    return this.http.delete<Task>(`api/tasks/${taskId}`);
  }

  public postTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>('api/tasks', task);
  }


  public getCompletedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('api/compeleted');
  }

}
