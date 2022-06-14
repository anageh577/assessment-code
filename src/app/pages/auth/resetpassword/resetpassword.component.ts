import { NbToastrConfig } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../services/helpers/app.service';
import { EventsService } from '../../../services/helpers/events.service';
import { HelperService } from '../../../services/helpers/helper.service';
@Component({
  selector: 'ngx-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  requestpasswordForm: FormGroup;
  rememberMe = false;
  redirectDelay = 1;
  lang;
  config: NbToastrConfig;
  constructor(
    private formBuilder: FormBuilder,
    private helper: HelperService,
    private router: Router,
    private appservice: AppService,
    private eventsService: EventsService,
  ) {
    this.lang = localStorage.getItem('rental_lang');
    this.eventsService.changeLangObser.subscribe(res => {
      this.lang = res;
    });
  }

  ngOnInit(): void {
    this.requestpasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
    });
  }

  sendmail() {
    this.helper.showSpinner();
    const slug = `users/sendResetOTP`;
    this.appservice.POST(slug, { 'email': this.requestpasswordForm.value.email }).subscribe(res => {
      this.helper.hideSpinner();
      if (res.status === true) {
        this.helper.showToastSuccess('success', res.message);
        this.router.navigate(['auth/change-password'],
          { queryParams: { email: this.requestpasswordForm.value.email } });
      } else {
        this.helper.showToastDanger('Error', res.message);
      }
    }, err => {
      this.helper.hideSpinner();
      this.helper.showToastDanger('Error', err.error.message);
    });
  }
}
