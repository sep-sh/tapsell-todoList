import { Component, OnInit, Signal, WritableSignal } from '@angular/core';
import { TasksListService } from './services/tasks-list.service';
import { ActivatedRoute } from '@angular/router';
import { Task, TaskEvent } from '../../shared/types/task.type';
import { TaskComponent } from '../../shared/components/task/task.component';
import { tap } from 'rxjs';
import { List } from '../../shared/types/list.type';
import { TaskEventType } from '../../shared/enums/shared.enum';
import { NewTaskComponent } from '../../shared/components/new-task/new-task.component';
import { ListHeaderComponent } from "../../shared/components/list-header/list-header.component";
@Component({
  selector: 'app-tasks-list',
  imports: [TaskComponent, NewTaskComponent, ListHeaderComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
  standalone: true,
})
export class TasksListComponent implements OnInit {
  readonly listId: WritableSignal<string | null>;
  readonly list: Signal<List | null>;
  readonly tasks: Signal<Task[]>;
  readonly resetCreateTaskForm: Signal<boolean>;

  constructor(private service: TasksListService, private route: ActivatedRoute) {
    this.list = this.service.list
    this.tasks = this.service.tasks
    this.listId = this.service.listId
    this.resetCreateTaskForm = this.service.resetCreateTaskForm
  }

  ngOnInit() {
    this.handleRouteParamChanges();
  }

  onAddNewTask(task: Partial<Task>) {
    this.service.onCreateNewTaskEvent(task)

  }

  private handleRouteParamChanges() {
    this.route.params.pipe(
      tap((params) => {
        this.listId.set(params['id']);
        this.service.fetchPageData();
      })
    ).subscribe();
  }


  onTaskEvent(event: TaskEvent) {
    switch (event.type) {
      case TaskEventType.DELETE:
        this.service.onDeleteTaskEvent(event.data)
        break;

      case TaskEventType.MOVE_TO_DAILY:
        this.service.onMoveToDailyEvent(event.data)
        break;

      case TaskEventType.SUBMIT:
        this.service.onUpdateTaskEvent(event.data)
        break;

    }
  }


}
