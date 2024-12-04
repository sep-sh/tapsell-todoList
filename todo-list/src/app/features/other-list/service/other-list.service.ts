import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
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
  readonly tasksActionCompleted: WritableSignal<TaskActionResult | null> = signal<TaskActionResult | null>(null);
  readonly listActionCompleted: WritableSignal<ListActionResult | null> = signal<ListActionResult | null>(null);
  readonly currentListId: WritableSignal<ListId | null> = signal<ListId | null>(null);


  constructor(private listService: OtherListsListService, private tasksService: OtherListsTaskService) {
    this.list = this.listService.list
    this.tasks = this.tasksService.tasks
  }

  public initialize(listId: ListId) {
    this.currentListId.set(listId)
    this.listService.initialize(listId)
    this.tasksService.initialize(listId)
  }


  public onCreateNewTaskEvent(task: Partial<Task>) {
    this.tasksService.createTask(task, this.list()?._id!).subscribe((result: TaskActionResult) => {
      this.tasksActionCompleted.set(result)
      this.tasksService.initialize(this.currentListId()!)
    })
  }

  public onDeleteListEvent(list: List) {
    this.listService.confirmAndDeleteList(list).subscribe((result: ListActionResult) => {
      this.listActionCompleted.set(result)
      this.listService.initialize(this.currentListId()!)

    })
  }

  public onUpdateListEvent(list: List) {
    this.listService.updateList(list).subscribe((result: ListActionResult) => {
      this.listActionCompleted.set(result)
      this.listService.initialize(this.currentListId()!)
    })
  }

  public onDeleteTaskEvent(task: Task) {
    this.tasksService.confirmAndDeleteTask(task).subscribe((result: TaskActionResult) => {
      this.tasksActionCompleted.set(result)
      this.tasksService.initialize(this.currentListId()!)

    })
  }

  public onMoveTaskToDailyListEvent(task: Task) {
    this.tasksService.moveTaskToDaily(task, this.listService.mainList()?._id!).subscribe((result: TaskActionResult) => {
      this.tasksActionCompleted.set(result)
      this.tasksService.initialize(this.currentListId()!)

    })
  }
  public onUpdateTaskEvent(task: Task) {
    this.tasksService.updateTask(task).subscribe((result: TaskActionResult) => {
      this.tasksActionCompleted.set(result)
      this.tasksService.initialize(this.currentListId()!)

    })
  }


}
