import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {TimeSince} from '@app/shared/utils/TimeSince'
import {NotificationService} from "@app/shared/services/notification.service";
import {AuthService} from "@app/views/tasks/auth/services/auth.service";
import {BehaviorSubject} from "rxjs";
import Notification from "@app/shared/types/notification.interface";

const storageKey = 'notifications'


@Component({
  selector: 'nav-notification',
  templateUrl: './nav-notification.component.html',
  host: {
    '[class.header-nav-item]': 'true'
  }
})
export class NavNotificationComponent implements OnInit {

  viewed$: BehaviorSubject<boolean>;

  notificationList$: BehaviorSubject<Notification[]>;
  notificationIconMap = {
    0: '',
    1: 'feather icon-info',
    2: 'feather icon-check-circle',
    3: 'feather icon-x-circle'
  }

  notificationColorMap = {
    0: '',
    1: 'bg-primary',
    2: 'bg-success',
    3: 'bg-danger'
  }

  constructor(private notificationService: NotificationService, private authService: AuthService) {
    this.viewed$ = new BehaviorSubject(false);
    this.notificationList$ = new BehaviorSubject([]);
  }

  ngOnInit() {

  }

  loadData() {
    this.notificationService.getNotificationList().subscribe(notifications => {
      this.notificationList$.next(notifications)
    })
  }

  getTimeDistance(time: number) {
    return TimeSince(time)
  }


  notifyViewed() {

  }
}
