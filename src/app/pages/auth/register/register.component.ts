import { NbToastrConfig } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../services/helpers/app.service';
import { MainUserRole } from '../../../@theme/enums/user-role';
import { HelperService } from '../../../services/helpers/helper.service';
import { EventsService } from '../../../services/helpers/events.service';



@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  rememberMe = false;
  redirectDelay = 1;
  fieldTextType: boolean;
  lang: any;
  config: NbToastrConfig;
  termsIsAccepted: boolean;
  userRole = MainUserRole;
  userRoleArr: any[];
  constructor(
    private appservice: AppService,
    private formBuilder: FormBuilder,
    private helper: HelperService,
    private router: Router,
    private eventsService: EventsService
  ) {
    this.userRoleArr = Object.entries(this.userRole).map(([value, key]) => ({ value, key }));
    this.eventsService.changeLangObser.subscribe((res) => {
      this.lang = res;
    });
  }
 

  ngOnInit() {
    this.RegisterForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ]),
      ],
      // rePass: [null],
      mobile: ['',
      [
          Validators.required,
        ],
      ],
      role: ['', [Validators.required]],
      num_of_units: [
        '',
        []
      ]
    });
  }
 
  acceptTerms(ev: any) {
    if (ev.target.checked === true) {
      this.termsIsAccepted = true;
    } else {
      this.termsIsAccepted = false;
    }
  }
 
  register() {
    if (this.RegisterForm.valid) {
      this.helper.showSpinner();
      const data = {
        email: this.RegisterForm.get('email').value,
        password: this.RegisterForm.get('password').value,
        full_name: this.RegisterForm.get('full_name').value,
        mobile: this.RegisterForm.get('mobile').value,
        role: this.RegisterForm.get('role').value,
        no_of_units: this.RegisterForm.get('num_of_units').value,
      };
      this.appservice.POST('users', data).subscribe((response) => {
        this.helper.hideSpinner();
        const email = response.user.user_name;
        const tel1 = response.user.notification_tel;
        return this.router.navigate(['auth/OTP'], {
          queryParams: {
            'email': email, 'phone': tel1,
          },
        });
      }, err => {
        this.helper.showToastDanger(
          'Error',
          err.error.message,
          );
          this.helper.hideSpinner();
      });
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
 
}
