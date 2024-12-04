import { Component, OnInit, Signal } from '@angular/core';
import { MainListService } from './services/main-list.service';
import { ListHeaderComponent } from "../../shared/components/list-header/list-header.component";
import { NewTaskComponent } from "../../shared/components/new-task/new-task.component";
import { TaskComponent } from "../../shared/components/task/task.component";
import { TaskEventType } from '../../shared/enums/shared.enum';
import { List, ListActionResult, Task, TaskActionResult, TaskEvent } from '../../shared/types/shared.type';
import { MainListTaskService } from './services/main-list-task.service';
import { MainListListService } from './services/main-list-list.service';
import { NewListDialogService } from '../../shared/services/new-list-dialog.service';

@Component({
  selector: 'app-main-list',
  imports: [ListHeaderComponent, NewTaskComponent, TaskComponent],
  templateUrl: './main-list.component.html',
  styleUrl: './main-list.component.scss',
  standalone: true,
  providers: [MainListListService, MainListTaskService, MainListService,NewListDialogService]
})
export class MainListComponent implements OnInit {
  readonly list: Signal<List | undefined>;
  readonly tasks: Signal<Task[]>;
  readonly listActionCompleted: Signal<ListActionResult | null>;
  readonly tasksActionCompleted: Signal<TaskActionResult | null>;




  constructor(private service: MainListService) {
    this.list = this.service.mainList
    this.tasks = this.service.tasks
    this.listActionCompleted = this.service.listActionCompleted
    this.tasksActionCompleted = this.service.tasksActionCompleted
  }


  ngOnInit(): void {
    this.service.initialize()
  }

  onAddNewTask(task: Partial<Task>) {
    this.service.onCreateNewTaskEvent(task)

  }

  onAddNewListEvent() {
    this.service.addNewListEvent()
  }

  onTaskEvent(event: TaskEvent) {
    switch (event.type) {
      case TaskEventType.DELETE:
        this.service.onDeleteTaskEvent(event.data)
        break;

      case TaskEventType.SUBMIT:
        this.service.onUpdateTaskEvent(event.data)
        break;

    }
  }


}
