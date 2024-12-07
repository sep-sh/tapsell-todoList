import { Component, OnInit, Signal } from '@angular/core';
import { CompletedListService } from './services/completed-list.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Task } from '../../shared/types/shared.type';
@Component({
  selector: 'app-completed-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './completed-list.component.html',
  styleUrl: './completed-list.component.scss',
  providers: [CompletedListService],
  standalone: true,
})
export class CompletedListComponent implements OnInit {
  public displayedColumns: string[] = ['title', 'description', 'delete']
  readonly tasks: Signal<Task[]>;


  constructor(private service: CompletedListService) {
    this.tasks = this.service.tasks
  }

  public ngOnInit(): void {
    this.service.initialize()
  }

  public onDeleteTaskButtonClick(task: Task): void {
    this.service.onDeleteTaskEvent(task)
  }






}
