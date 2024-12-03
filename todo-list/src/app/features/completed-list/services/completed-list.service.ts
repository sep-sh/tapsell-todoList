import { Injectable } from '@angular/core';
import { TaskApiService } from '../../../shared/services/http/task-api.service';
import { Task } from '../../../shared/types/task.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompletedListService {

  constructor(private taskApiService: TaskApiService) { }

  public getCompletedTasks(): Observable<Task[]> {
    return this.taskApiService.getCompletedTasks()
  }

  public deleteTask(task: Task): Observable<Task> {
    return this.taskApiService.deleteTaskById(task._id)
  }


}
