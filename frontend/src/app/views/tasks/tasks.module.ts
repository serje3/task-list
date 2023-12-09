import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {TasksRoutingModule} from './tasks-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SwitchModule} from '@app/shared/components/switch/switch.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from '@app/views/tasks/auth/guards/auth.guard';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {RadioModule} from '@app/shared/components/radio/radio.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {TaskComponent} from '@app/views/tasks/task/task.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import {PageSizeModule} from "@app/shared/components/page-size/page-size.module";
import { SmallNoteComponent } from './common/components/small-note/small-note.component';
import { SharedTasksComponent } from './shared-tasks/shared-tasks.component';
import {AuthModule} from "@app/views/tasks/auth/auth.module";


@NgModule({
  declarations: [
    TaskComponent,
    SmallNoteComponent,
    SharedTasksComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    TranslateModule,
    AuthModule,
    PaginationModule,
    NgxDatatableModule,
    SwitchModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule,
    CollapseModule,
    RadioModule,
    NgSelectModule,
    TypeaheadModule,
    AlertModule,
    TooltipModule,
    ClipboardModule,
    PageSizeModule,
  ],
  providers: [
    AuthGuard,
    DatePipe,
  ]
})
export class TasksModule {
}
