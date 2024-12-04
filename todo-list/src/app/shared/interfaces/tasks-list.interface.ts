import { WritableSignal } from '@angular/core';
import { Task } from '../types/task.type';
import { List, ListId } from '../types/list.type';
import { ListActionResult, TaskActionResult } from '../types/shared.type';
import { Observable } from 'rxjs';

export interface ITasksService {
    tasks: WritableSignal<Task[]>;
    initialize(listId: ListId): void;
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
    initialize(listId: ListId): void;
    confirmAndDeleteList(list: List): Observable<ListActionResult>;
    deleteList(list: List): Observable<ListActionResult>;
    updateList(list: List): Observable<ListActionResult>;
    createList(list: List): void;
}


