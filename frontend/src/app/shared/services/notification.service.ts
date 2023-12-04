import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import Notification from '../types/notification.interface';
import {map} from 'rxjs/operators';
import {AuthService} from "@app/views/tasks/auth/services/auth.service";
import {Profile} from "@app/views/tasks/auth/types/profile";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getNotificationList() {
    return this.authService.profile$.pipe(
      map(profile => {
        const notifications = [];
        const unpaidNotification = this.getUnpaidNotification(profile);

        if (unpaidNotification) notifications.push(unpaidNotification);
        return notifications;
      })
    )
  }

  createNotification(title, description, notificationType, avatar): Notification {
    return {
      target: title,
      description: description,
      avatar,
      notificationType
    }
  }

  private getUnpaidNotification(profile: Profile) {
    return null;
  }
}
