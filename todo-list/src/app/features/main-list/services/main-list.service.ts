import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { List } from '../../../shared/types/list.type';
import { Task } from '../../../shared/types/task.type';
import { NewListDialogService } from '../../../shared/services/new-list-dialog.service';
import { MainListTaskService } from './main-list-task.service';
import { MainListListService } from './main-list-list.service';
import { ListActionResult, TaskActionResult } from '../../../shared/types/shared.type';

@Injectable({
  providedIn: 'root'
})
export class MainListService {
  public tasks: WritableSignal<Task[]>
  readonly mainList: Signal<List | undefined>;
  public resetCreateTaskForm: WritableSignal<boolean> = signal<boolean>(false);
  readonly tasksActionCompleted: Signal<TaskActionResult | null>;
  readonly listActionCompleted: Signal<ListActionResult | null>;

  constructor(private taskService: MainListTaskService, private listsService: MainListListService, private newListDialogService: NewListDialogService) {
    this.mainList = this.listsService.mainList
    this.tasks = this.taskService.tasks
    this.tasksActionCompleted = this.taskService.actionCompleted
    this.listActionCompleted = this.listsService.actionCompleted
  }

  public initialize() {
    this.listsService.initialize(this.mainList()?._id!)
    this.taskService.initialize(this.mainList()?._id!)
  }


  onCreateNewTaskEvent(task: Partial<Task>) {
    this.taskService.createTask(task, this.mainList()?._id!)
  }

  onDeleteTaskEvent(task: Task) {
    this.taskService.confirmAndDeleteTask(task)
  }

  onUpdateTaskEvent(task: Task) {
    this.taskService.updateTask(task)
  }
  public addNewListEvent() {
    this.listsService.createList()

  }
  // public onDeleteTaskEvent(task: Task) {

  // }

  // private getTasksData() {
  //   return this.taskApiService.getTasksByListId(this.mainList()?._id!).subscribe((tasks: Task[]) => {
  //     this.tasks.set(tasks)
  //   })
  // }



}
