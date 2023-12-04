import {Component, Input, OnInit} from '@angular/core';
import {ReportStatistics} from '@app/views/tasks/common/types/report-statistics';

@Component({
  selector: 'report-statistics-comments',
  templateUrl: './report-statistics-comments.component.html',
  styleUrls: ['./report-statistics-comments.component.scss']
})
export class ReportStatisticsCommentsComponent implements OnInit {

  @Input() reportStatistics: ReportStatistics;

  @Input() translate: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
