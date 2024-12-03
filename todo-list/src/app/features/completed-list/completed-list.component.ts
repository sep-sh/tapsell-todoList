import { Component, OnInit, Signal } from '@angular/core';
import { Task } from '../../shared/types/task.type';
import { CompletedListService } from './services/completed-list.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-completed-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './completed-list.component.html',
  styleUrl: './completed-list.component.scss',
  standalone: true,
})
export class CompletedListComponent implements OnInit {
  public displayedColumns: string[] = ['title', 'description', 'delete']
  public readonly completedTasks: Signal<Task[]>;

  constructor(private service: CompletedListService) {
    this.completedTasks = this.service.completedTasks
  }

  public ngOnInit(): void {
    this.service.fetchPageData()
  }

  public onDeleteTaskButtonClick(task: Task): void {
    this.service.onDeleteTask(task)
  }






}
