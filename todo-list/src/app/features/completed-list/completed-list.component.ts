import { Component } from '@angular/core';
import { TaskApiService } from '../../shared/services/http/task-api.service';
import { TaskComponent } from '../../shared/components/task/task.component';
import { Task } from '../../shared/types/task.type';

@Component({
  selector: 'app-completed-list',
  imports: [TaskComponent],
  templateUrl: './completed-list.component.html',
  styleUrl: './completed-list.component.scss',
  standalone: true,
})
export class CompletedListComponent {
  task: Task = {
    _id: '674c6a69a2c687441882384e',
    title: 'completed 1 ',
    description: 'randome completed 1',
    done: true,
    list: '674acdb826a5b338a4d31df6',
    date: new Date('2024-12-01T13:53:45.608Z'),
    __v: 0,
  };
  constructor(private _task: TaskApiService) {
    this._task.getCompleted();
  }
}
