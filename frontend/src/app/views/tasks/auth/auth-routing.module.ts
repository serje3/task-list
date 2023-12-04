import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '@app/views/tasks/auth/login/login.component';
import {LogoutComponent} from '@app/views/tasks/auth/logout/logout.component';
import {SignupComponent} from "@app/views/tasks/auth/signup/signup.component";

const authPageSettigns = {
  hidePageHeader: true,
  hideHeaderNavbar: true,
  hideAlerts: true
}

const routes: Routes = [
  {
    path: 'login', component: LoginComponent, data: {
      title: 'login',
      ...authPageSettigns
    }
  },
  {
    path: 'logout', component: LogoutComponent, data: {
      title: 'logout',
      ...authPageSettigns
    }
  },
  {
    path: 'sign-up', component: SignupComponent, data: {
      title: 'sign-up',
      ...authPageSettigns
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
