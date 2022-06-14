import { NbToastrConfig } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../services/helpers/app.service';
import { HelperService } from '../../../services/helpers/helper.service';
import { EventsService } from '../../../services/helpers/events.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  lang: any;
  fieldTextType: boolean;
  rememberMe = false;
  redirectDelay = 1;
  config: NbToastrConfig;
  isLoading: boolean;
  constructor(
    private appservice: AppService,
    private formBuilder: FormBuilder,
    private helper: HelperService,
    private router: Router,
    private eventsService: EventsService
  ) {
    this.eventsService.changeLangObser.subscribe((res) => {
      this.lang = res;
    });
  }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ]),
      ],
      rememberMe: false,
    });
  }

  rememberMeFlag: boolean;
  rememberMeFun(ev) {
    if (ev.target.checked === true) {
      this.rememberMeFlag = true;
    } else {
      this.rememberMeFlag = false;
    }
  }


  login() {
    this.helper.showSpinner();
    if (this.LoginForm.valid) {
      const data = {
        email: this.LoginForm.get('email').value,
        password: this.LoginForm.get('password').value,
      };
      this.appservice.POST('users/login', data).subscribe((response: any) => {
        this.helper.hideSpinner();
        this.isLoading = false;
        if (response.statuscode === 200) {
          if (this.rememberMeFlag === true) {
            localStorage.setItem('remembered', 'true');
            localStorage.setItem('email', this.LoginForm.get('email').value);
            localStorage.setItem('userId', response['userid']);
            localStorage.setItem('user_type', response['user_type']);
            this.appservice.Isverified();
            this.navigatoeToDashboard(response['user_type']);
            this.eventsService.logineventfunction(response['user_type']);
          } else {
            localStorage.setItem('email', this.LoginForm.get('email').value);
            sessionStorage.setItem('userId', response['userid']);
            localStorage.setItem('userId', response['userid']);
            localStorage.setItem('user_type', response['user_type']);
            this.appservice.Isverified();
            this.navigatoeToDashboard(response['user_type']);
            this.eventsService.logineventfunction(response['user_type']);
          }

        } else if (response.statuscode !== 200) {
          this.helper.showToastDanger('Error', response.message);
          this.helper.hideSpinner();
        }
      }, err => {
        this.helper.hideSpinner();
        this.helper.showToastDanger(
          'Error',
          err.error.message,
        );
      },
      );
    }
  }
  navigatoeToDashboard(userRole) {
    if (userRole == 2) {
      this.router.navigate(['/pages/dashboard/payer']);
      this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    } else {
      this.router.navigate(['/pages/dashboard/super']);
      this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    }
    this.helper.showToastSuccess('Login Successfully', 'Welcome to Boyot');
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
