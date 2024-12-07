import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { MainListTaskService } from './main-list-task.service';
import { MainListListService } from './main-list-list.service';
import { List, ListActionResult, Task, TaskActionResult } from '../../../shared/types/shared.type';
import { TasksFetchMode } from '../../../shared/enums/shared.enum';

@Injectable()
export class MainListService {
  public tasks: WritableSignal<Task[]>
  readonly mainList: Signal<List | undefined>;
  public resetCreateTaskForm: WritableSignal<boolean> = signal<boolean>(false);
  readonly tasksActionCompleted: WritableSignal<TaskActionResult | null> = signal<TaskActionResult | null>(null);
  readonly listActionCompleted: WritableSignal<ListActionResult | null> = signal<ListActionResult | null>(null);


  constructor(private taskService: MainListTaskService, private listsService: MainListListService) {
    this.mainList = this.listsService.mainList
    this.tasks = this.taskService.tasks
  }

  public initialize() {
    this.listsService.setLists(this.mainList()?._id!)
    this.taskService.setTasks(TasksFetchMode.WITH_ID, this.mainList()?._id!)
  }


  onCreateNewTaskEvent(task: Partial<Task>) {
    this.taskService.createTask(task, this.mainList()?._id!).subscribe((result: TaskActionResult) => {
      this.tasksActionCompleted.set(result)
      this.taskService.setTasks(TasksFetchMode.WITH_ID, this.mainList()?._id!)
    })
  }

  onDeleteTaskEvent(task: Task) {
    this.taskService.confirmAndDeleteTask(task).subscribe((result: TaskActionResult) => {
      this.tasksActionCompleted.set(result)
      this.taskService.setTasks(TasksFetchMode.WITH_ID, this.mainList()?._id!)

    })
  }

  onUpdateTaskEvent(task: Task) {
    this.taskService.updateTask(task).subscribe((result: TaskActionResult) => {
      this.tasksActionCompleted.set(result)
      this.taskService.setTasks(TasksFetchMode.WITH_ID, this.mainList()?._id!)

    })
  }
  public addNewListEvent() {
    this.listsService.createList()

  }




}
