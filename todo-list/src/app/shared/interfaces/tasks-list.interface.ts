import { WritableSignal } from '@angular/core';
import { List, ListActionResult, ListId, Task, TaskActionResult } from '../types/shared.type';
import { Observable } from 'rxjs';
import { TasksFetchMode } from '../enums/shared.enum';

export interface ITasksService {
    tasks: WritableSignal<Task[]>;
    setTasks(fetchMode: TasksFetchMode, listId?: ListId): void;
    createTask(task: Partial<Task>, listId: ListId): Observable<TaskActionResult>;
    updateTask(task: Task): Observable<TaskActionResult>;
    deleteTask(task: Task): Observable<TaskActionResult>;
    confirmAndDeleteTask(task: Task): Observable<TaskActionResult>;
    moveTaskToDaily(task: Task, mainListId: ListId): Observable<TaskActionResult>;
}

export interface IListsService {
    list: WritableSignal<List | null>;
    mainList: WritableSignal<List | undefined>;
    currentPageListId: WritableSignal<ListId | null>;
    setLists(listId: ListId): void;
    confirmAndDeleteList(list: List): Observable<ListActionResult>;
    deleteList(list: List): Observable<ListActionResult>;
    updateList(list: List): Observable<ListActionResult>;
    createList(list: List): void;
}


