import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core'

interface IPageService {
  itemsPerPage
}

@Component({
  selector: 'page-size',
  templateUrl: './page-size.component.html',
})
export class PageSizeComponent implements OnInit {


  @Output()
  onChange = new EventEmitter()

  @Input()
  pageService: IPageService;

  public sizesOfPage = [15, 50, 100, 500];

  constructor() {}

  ngOnInit(): void {
  }


  onOpen($event: any) {
    console.log($event)
  }
}
