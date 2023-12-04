import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {BehaviorSubject, forkJoin} from "rxjs";
import {Task} from "@app/views/tasks/task/models";
import {TaskService} from "@app/views/tasks/task/task.service";
import {AlertService} from "@app/views/tasks/common/services/alert.service";
import {PagesConfig} from "@app/configs/pages.config";

@Component({
    selector: 'app-shared-tasks',
    templateUrl: './shared-tasks.component.html',
    styleUrls: ['./shared-tasks.component.css']
})
export class SharedTasksComponent implements OnInit {

    sharedId: string;
    tasks: BehaviorSubject<Task[]>

    constructor(private route: ActivatedRoute,
                private router: Router,
                private taskService: TaskService,
                private alertService: AlertService) {
        this.tasks = new BehaviorSubject<Task[]>(null);
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.sharedId = params.uuid;
            this.retrieveSharedTasks()
        });
    }

    retrieveSharedTasks() {
        this.taskService.getSharedTasks(this.sharedId)
            .subscribe({
                next: tasks => this.tasks.next(tasks),
                error: err => this.alertService.add(err, 'danger')
            });
    }

    protected readonly ColumnMode = ColumnMode;

    addTasks() {
        const tasks: Task[] = this.tasks.getValue();
        const tasksObservables = tasks.map(task => {
            return this.taskService.createTask(task.content);
        });

        forkJoin(tasksObservables).subscribe({
            next: tasks => {
                console.log("OK", tasks)
                this.alertService.add("Все задачи добавлены", 'success')
                this.router.navigateByUrl(PagesConfig.tasks)
            },
            error: err => {
                console.log("SOMETHING WRONG", err)
            }
        });
    }
}
