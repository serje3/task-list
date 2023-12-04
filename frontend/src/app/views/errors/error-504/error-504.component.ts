import {Component} from '@angular/core';
import {PagesConfig} from "@app/configs/pages.config";

@Component({
  selector: 'error-504',
  templateUrl: './error-504.component.html'
})
export class Error504Component {

  pages = PagesConfig
  constructor() {
  }
}
