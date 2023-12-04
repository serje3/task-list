import {Component, Input, OnInit} from '@angular/core';
import {ReportStatistics} from '@app/views/tasks/common/types/report-statistics';

@Component({
  selector: 'report-statistics-likes',
  templateUrl: './report-statistics-likes.component.html',
  styleUrls: ['./report-statistics-likes.component.scss']
})
export class ReportStatisticsLikesComponent implements OnInit {

  @Input() reportStatistics: ReportStatistics;

  @Input() translate: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
