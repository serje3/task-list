import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Profile} from '@app/views/tasks/auth/types/profile';
import {AuthService} from '@app/views/tasks/auth/services/auth.service';
import {PagesConfig} from '@app/configs/pages.config';
import {navProfileTranslate} from "@app/layout/components/nav-profile/nav-profile.translate";

@Component({
  selector: 'nav-profile',
  templateUrl: './nav-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.header-nav-item]': 'true'
  }
})
export class NavProfileComponent implements OnInit {

  translate = navProfileTranslate;

  constructor(public authService: AuthService) {
  }

  profileMenuList = [
    {
      path: PagesConfig.logout,
      icon: 'feather icon-power',
      item: 'Sign out',
      key: 'Quit'
    }
  ];

  ngOnInit(): void {
  }
}
