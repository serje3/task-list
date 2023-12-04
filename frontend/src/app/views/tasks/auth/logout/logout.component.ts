import {Component, OnInit} from '@angular/core';
import {AuthService} from '@app/views/tasks/auth/services/auth.service';
import {Router} from '@angular/router';
import {PagesConfig} from '@app/configs/pages.config';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.logout().subscribe(data => {
      this.router.navigateByUrl(PagesConfig.login);
    });
  }

}
