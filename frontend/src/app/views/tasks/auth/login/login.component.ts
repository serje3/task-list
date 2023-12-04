import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@app/views/tasks/auth/services/auth.service';
import {PagesConfig} from "@app/configs/pages.config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  Pages = PagesConfig;

  headerKey = 'LOGIN.HEADER';
  descriptionKey = 'LOGIN.DESCRIPTION';
  signInLabelKey = 'LOGIN.SIGN_IN_LABEL';
  usernameLabelKey = 'LOGIN.USERNAME_LABEL';
  passwordLabelKey = 'LOGIN.PASSWORD_LABEL';
  submitLabelKey = 'LOGIN.SUBMIT';

  rememberMeLabelKey = 'LOGIN.REMEMBER_ME'
  forgotPasswordLabelKey = 'LOGIN.FORGOT_PASSWORD'

  form: FormGroup;

  constructor(fb: FormBuilder, public authService: AuthService) {
    this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember_me: [false]
    });
  }

  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }
    console.log(this.form.value, this.form.valid);
  }

  updateRememberMeCheckbox(e) {
    const rememberMeCheckbox = this.form.get('remember_me');
    rememberMeCheckbox.setValue(e.checked);
  }

}
