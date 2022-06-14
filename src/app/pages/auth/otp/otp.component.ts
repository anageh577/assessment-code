import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../services/helpers/app.service';
import { HelperService } from '../../../services/helpers/helper.service';

@Component({
  selector: 'ngx-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  email;
  phone;
  firstDigit;
  secondDigit;
  thirdDigit;
  forthDigit;
  fivethDigit;
  constructor(private appService: AppService, private helper: HelperService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params.email;
      this.phone = params.tel1;
    });
  }
  next(next, pre, cur, ev) {
    if (ev.key === 'Backspace' || ev.key === 'Delete') {
      (<HTMLInputElement>document.getElementById(pre)).focus();
      (<HTMLInputElement>document.getElementById(cur)).value = '';
    } else {
      document.getElementById(next).focus();
      if (cur === 'fiveth') {
        (<HTMLInputElement>document.getElementById(cur)).blur();
      }
    }
  }

  verify() {
    this.helper.showSpinner();
    const slug = `users/verify`;
    const code =
      this.firstDigit + ''
      + this.secondDigit + ''
      + this.thirdDigit + ''
      + this.forthDigit + ''
      + this.fivethDigit;
    this.appService.POST(slug, { 'email': this.email, 'code': code }).subscribe(response => {
      this.helper.hideSpinner();
      if (response['status'] === true) {
        this.router.navigate(['auth/login']);
        this.helper.showToastSuccess('Success', 'you can log in now');
        this.helper.showToastSuccess('Success', 'A mail sent to you , Please verify your email');
      } else {
        this.helper.showToastDanger('Error', 'something went wrong');
      }
    }, err => {
      this.helper.hideSpinner();
      this.helper.showToastDanger('Error', err.error.message[Object.keys(err.error.message)[0]][0]);
    });
  }
  resend() {
    this.firstDigit = '';
    this.secondDigit = '';
    this.thirdDigit = '';
    this.forthDigit = '';
    this.fivethDigit = '';
    this.helper.showSpinner();
    const slug = `users/resend`;
    this.appService.POST(slug, { 'email': this.email }).subscribe(response => {
      this.helper.hideSpinner();
      if (response['status'] === true) {
        this.helper.showToastSuccess('Success', 'you can enter the new code');
      } else {
        this.helper.showToastDanger('Error', 'something went wrong');
      }
    }, err => {
      this.helper.hideSpinner();
      this.helper.showToastDanger('Error', err.error.message[Object.keys(err.error.message)[0]][0]);
    });
  }
}
