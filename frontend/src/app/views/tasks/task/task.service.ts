import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConfig} from "@app/configs/api.config";
import {Observable} from "rxjs";
import {Task} from "@app/views/tasks/task/models";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(
        private http: HttpClient
    ) {
    }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(ApiConfig.tasks, {withCredentials: true})
    }

    createTask(content: string): Observable<Task> {
        return this.http.post<Task>(ApiConfig.tasks, {content}, {withCredentials: true});
    }

    shareTasks(taskIds: string[]): Observable<string> {
        return this.http.post<string>(ApiConfig.shareTasks, {
            tasks: taskIds
        }, {withCredentials: true});
    }

    getSharedTasks(sharedId: string): Observable<Task[]> {
        return this.http.get<Task[]>(ApiConfig.shareTasks + `/${sharedId}`, {withCredentials: true})
    }
}
