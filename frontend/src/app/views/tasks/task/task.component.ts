import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TaskService} from "@app/views/tasks/task/task.service";
import {BehaviorSubject} from "rxjs";
import {Task} from "@app/views/tasks/task/models";
import {ColumnMode, SelectionType} from "@swimlane/ngx-datatable";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Clipboard} from "@angular/cdk/clipboard";
import {AlertService} from "@app/views/tasks/common/services/alert.service";

@Component({
    selector: 'app-home',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
    @ViewChild('taskCreateModal') templateRef: TemplateRef<any>
    modalRef: BsModalRef;

    tasks: BehaviorSubject<Task[]>
    selected: Task[] = [];

    taskCreateForm: FormGroup;


    get contentField(): FormControl {
        return this.taskCreateForm.get('content') as FormControl;
    }

    constructor(private taskService: TaskService,
                private fb: FormBuilder,
                private modalService: BsModalService,
                private clipboard: Clipboard,
                private alertService: AlertService) {
        this.tasks = new BehaviorSubject<Task[]>(null);
        this.taskCreateForm = fb.group({
            content: ["", [Validators.required]]
        })
    }

    ngOnInit(): void {
        this.retrieveTasks();
    }

    retrieveTasks() {
        this.taskService.getTasks().subscribe(tasks => this.tasks.next(tasks));
    }

    onSelect($event) {
        this.selected = $event.selected;
    }


    openTaskCreation(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    closeTaskCreation() {
        this.modalRef.hide()
    }

    submitTaskCreation() {
        if (this.taskCreateForm.valid) {
            this.taskService.createTask(this.contentField.value).subscribe(
                task => {
                    this.retrieveTasks();
                    this.closeTaskCreation();
                }
            );
        }
    }

    shareTasks() {
        if (this.selected.length == 0) {
            // do nothing
            return;
        }
        this.taskService.shareTasks(this.selected.map(task => task.id)).subscribe(shareId => {
            const pending = this.clipboard.beginCopy("http://localhost:4200/tasks/" + shareId);
            let remainingAttempts = 3;
            const attempt = () => {
                const copied: boolean = pending.copy();
                if (!copied && --remainingAttempts) {
                    setTimeout(attempt);
                } else {
                    this.alertService.add("Ссылка на выделенные задачи скопирована", 'info');
                    pending.destroy();
                }
            };
            attempt();
        });
    }

    protected readonly ColumnMode = ColumnMode;
    protected readonly SelectionType = SelectionType;
}
