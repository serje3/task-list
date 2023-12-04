import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "@app/views/tasks/common/validators";
import {PagesConfig} from "@app/configs/pages.config";
import {AuthService} from "@app/views/tasks/auth/services/auth.service";
import {AlertService} from "@app/views/tasks/common/services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  showValidationErrors = false;

  translate = {
    header: 'SIGNUP.HEADER',
    description: 'SIGNUP.DESCRIPTION',
    username: 'SIGNUP.USERNAME',
    password: 'SIGNUP.PASSWORD',
    passwordConfirm: 'SIGNUP.PASSWORD_CONFIRM',
    referralCode: 'SIGNUP.REFERRAL_CODE',
    email: 'SIGNUP.EMAIL',
    toLogin: 'SIGNUP.TO_LOGIN',
    loginLabel: 'SIGNUP.LOGIN_LABEL',
    submit: 'SIGNUP.SUBMIT',
    success: 'SIGNUP.SUCCESS'
  }

  form: FormGroup

  minLengthUsername = 5
  minLengthPassword = 8

  Pages = PagesConfig

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password1') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.form.get('password2') as FormControl;
  }

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              public alertService: AlertService,
              private router: Router) {
    this.form = fb.group({
      'username': ['', Validators.required],
      'password1': ['', [Validators.minLength(this.minLengthPassword), Validators.required]],
      'password2': ['', [Validators.minLength(this.minLengthPassword), Validators.required]],
    }, {validators: CustomValidators.stringMatch('password1', 'password2')})

  }

  ngOnInit(): void {
  }

  getNgClassValidationObject(control: FormControl, bool = false) {
    return {
      'is-invalid': this.showValidationErrors && control.invalid || bool
    }
  }

  onSignUp() {
    if (this.form.invalid) {
      this.showValidationErrors = true;
      return;
    }
    this.showValidationErrors = false;

    this.authService.register(this.form.value).subscribe(data => {
      console.log(data)
      this.alertService.add("Вы успешно зарегистрировались.", 'success');
      this.router.navigateByUrl(PagesConfig.login);
    }, errorResponse => {
      this.alertService.add(errorResponse.error, 'danger');
      if (errorResponse.status === 500) {
        this.alertService.add(errorResponse.status + " " + errorResponse.statusText, 'danger');
      }
    })
  }

}
