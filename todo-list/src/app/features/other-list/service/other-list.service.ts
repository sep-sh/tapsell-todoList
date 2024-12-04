import { Injectable, Signal } from '@angular/core';
import { OtherListsListService } from './other-lists-list.service';
import { List, ListId } from '../../../shared/types/list.type';
import { OtherListsTaskService } from './other-lists-task.service';
import { Task } from '../../../shared/types/task.type';
import { ListActionResult, TaskActionResult } from '../../../shared/types/shared.type';

@Injectable({
  providedIn: 'root'
})
export class OtherListService {
  readonly list: Signal<List | null>;
  readonly tasks: Signal<Task[]>;
  readonly tasksActionCompleted: Signal<TaskActionResult | null>;
  readonly listActionCompleted: Signal<ListActionResult | null>;


  constructor(private listService: OtherListsListService, private tasksService: OtherListsTaskService) {
    this.list = this.listService.list
    this.tasks = this.tasksService.tasks
    this.tasksActionCompleted = this.tasksService.actionCompleted
    this.listActionCompleted = this.listService.actionCompleted
  }

  public initialize(listId: ListId) {
    this.listService.initialize(listId)
    this.tasksService.initialize(listId)
  }


  public onCreateNewTaskEvent(task: Partial<Task>) {
    this.tasksService.createTask(task, this.list()?._id!)
  }

  public onDeleteListEvent(list: List) {
    this.listService.confirmAndDeleteList(list)
  }


  public onUpdateListEvent(list: List) {
    this.listService.updateList(list)
  }

  public onDeleteTaskEvent(task: Task) {
    this.tasksService.confirmAndDeleteTask(task)
  }

  public onMoveTaskToDailyListEvent(task: Task) {
    this.tasksService.moveTaskToDaily(task, this.listService.mainList()?._id!)
  }
  public onUpdateTaskEvent(task: Task) {
    this.tasksService.updateTask(task)
  }


}
