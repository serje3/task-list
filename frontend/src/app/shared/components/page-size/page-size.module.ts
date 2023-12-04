import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageSizeComponent} from "@app/shared/components/page-size/page-size.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, NgSelectModule, FormsModule],
  exports: [PageSizeComponent],
  declarations: [PageSizeComponent]
})
export class PageSizeModule { }
