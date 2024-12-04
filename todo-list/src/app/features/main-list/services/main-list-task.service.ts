import { Injectable } from '@angular/core';
import { TaskBaseService } from '../../../shared/services/task-base.service';
import { TaskApiService } from '../../../shared/services/http/task-api.service';

@Injectable()
export class MainListTaskService extends TaskBaseService {

  constructor(taskApiService: TaskApiService) {
    super(taskApiService)
  }
}
