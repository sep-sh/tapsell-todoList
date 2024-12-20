import { Component, effect, Signal } from '@angular/core';
import { OtherListService } from './service/other-list.service';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ListHeaderComponent } from '../../shared/components/list-header/list-header.component';
import { NewTaskComponent } from '../../shared/components/new-task/new-task.component';
import { TaskComponent } from '../../shared/components/task/task.component';
import { TaskEventType } from '../../shared/enums/shared.enum';
import { List, ListActionResult, ListEvent, Task, TaskActionResult, TaskEvent } from '../../shared/types/shared.type';
import { OtherListsListService } from './service/other-lists-list.service';
import { OtherListsTaskService } from './service/other-lists-task.service';
import { NewListDialogService } from '../../shared/services/new-list-dialog.service';

@Component({
  selector: 'app-other-list',
  imports: [TaskComponent, NewTaskComponent, ListHeaderComponent],
  templateUrl: './other-list.component.html',
  styleUrl: './other-list.component.scss',
  standalone: true,
  providers: [OtherListsTaskService, OtherListsListService, OtherListService,NewListDialogService]
})
export class OtherListComponent {
  readonly list: Signal<List | null>;
  readonly tasks: Signal<Task[]>;
  readonly listActionCompleted: Signal<ListActionResult | null>;
  readonly tasksActionCompleted: Signal<TaskActionResult | null>;


  constructor(private service: OtherListService, private route: ActivatedRoute) {
    this.handleRouteParamChanges()
    this.list = this.service.list
    this.tasks = this.service.tasks
    this.listActionCompleted = this.service.listActionCompleted
    this.tasksActionCompleted = this.service.tasksActionCompleted


  }

  private handleRouteParamChanges() {
    this.route.params.pipe(
      tap((params) => {
        this.service.initialize(params['id'])
      })
    ).subscribe();
  }


  onAddNewTask(task: Partial<Task>) {
    this.service.onCreateNewTaskEvent(task)

  }

  onListEvent(event: ListEvent) {
    switch (event.type) {
      case TaskEventType.DELETE:
        this.service.onDeleteListEvent(event.data)

        break;


      case TaskEventType.SUBMIT:
        this.service.onUpdateListEvent(event.data)
        break;

    }

  }


  onTaskEvent(event: TaskEvent) {
    switch (event.type) {
      case TaskEventType.DELETE:
        this.service.onDeleteTaskEvent(event.data)
        break;

      case TaskEventType.MOVE_TO_DAILY:
        this.service.onMoveTaskToDailyListEvent(event.data)
        break;

      case TaskEventType.SUBMIT:
        this.service.onUpdateTaskEvent(event.data)
        break;

    }
  }


}
