import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TasksFetchMode } from '../../../shared/enums/shared.enum';
import { CompletedListTaskService } from './completed-list-task.service';
import { Task, TaskActionResult } from '../../../shared/types/shared.type';

@Injectable()

export class CompletedListService {
  readonly tasks: Signal<Task[]>;
  readonly tasksActionCompleted: WritableSignal<TaskActionResult | null> = signal<TaskActionResult | null>(null);



  constructor(private taskService: CompletedListTaskService) {
    this.tasks = this.taskService.tasks
  }

  public initialize(): void {
    this.taskService.setTasks(TasksFetchMode.COMPLETED)
  }

  public onDeleteTaskEvent(task: Task) {
    this.taskService.confirmAndDeleteTask(task).subscribe((result: TaskActionResult) => {
      this.tasksActionCompleted.set(result)
      this.taskService.setTasks(TasksFetchMode.COMPLETED)

    })
  }
}
