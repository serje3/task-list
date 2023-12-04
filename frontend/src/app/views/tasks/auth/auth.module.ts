import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {AuthModule as AuModule} from '@app/views/auth/auth.module';
import {TranslateModule} from '@ngx-translate/core';
import {CheckboxModule} from '@app/shared/components/checkbox/checkbox.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LogoutComponent} from './logout/logout.component';
import {AlertModule} from 'ngx-bootstrap/alert';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SignupComponent} from "@app/views/tasks/auth/signup/signup.component";


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuModule,
    TranslateModule,
    CheckboxModule,
    ReactiveFormsModule,
    AlertModule,
    ToastrModule.forRoot()
  ],
  providers: [

  ]
})
export class AuthModule {
}
