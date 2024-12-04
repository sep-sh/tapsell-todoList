import { WritableSignal } from '@angular/core';
import { Task } from '../types/task.type';
import { List, ListId } from '../types/list.type';
import { ListActionResult, TaskActionResult } from '../types/shared.type';

export interface ITasksService {
    tasks: WritableSignal<Task[]>;
    actionCompleted: WritableSignal<TaskActionResult | null>;
    initialize(listId: ListId): void;
    fetchTasks(): void;
    createTask(task: Partial<Task>, listId: ListId): void;
    updateTask(task: Task): void;
    deleteTask(task: Task): void;
    confirmAndDeleteTask(task: Task): void;
    moveTaskToDaily(task: Task, mainListId: ListId): void;
}

export interface IListsService {
    list: WritableSignal<List | null>;
    mainList: WritableSignal<List | undefined>;
    currentPageListId: WritableSignal<ListId | null>;
    actionCompleted: WritableSignal<ListActionResult | null>;
    initialize(listId: ListId): void;
    fetchList(): void;
    confirmAndDeleteList(list: List): void;
    deleteList(list: List): void;
    updateList(list: List): void;
    createList(list: List): void;
}


