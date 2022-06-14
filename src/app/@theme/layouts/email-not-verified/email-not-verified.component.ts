import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/helpers/app.service';
import { EventsService } from '../../../services/helpers/events.service';
import { HelperService } from '../../../services/helpers/helper.service';
@Component({
  selector: 'ngx-email-not-verified',
  templateUrl: './email-not-verified.component.html',
  styleUrls: ['./email-not-verified.component.scss'],
})
export class EmailNotVerifiedComponent implements OnInit {
  verified = true;
  finishrequest;
  constructor(
    private eventsServices: EventsService,
    private translateService: TranslateService,
    private helper: HelperService,
    private appservice: AppService) { }

  ngOnInit(): void {
    this.eventsServices.changeLangObser.subscribe(langresp => {
      this.translateService.use(langresp);
      this.appservice.finishRequestObser.subscribe(res => {
        this.finishrequest = res;

      });
      this.appservice.obserVerified.subscribe((response: any) => {
        this.verified = response.status;
      }, err => {
        (err);
        this.verified = err.error.status;
      });
    });
  }
  resend() {
    const email = localStorage.getItem('email');
    if (email && localStorage.getItem('userId')) {
      this.helper.showSpinner();
      const slug = `users/resendEmail?email=${email}`;
      this.appservice.POST(slug, {}).subscribe(res => {
        this.helper.hideSpinner();
        this.helper.showToastSuccess('success', 'Email sent');
      }, err => {
        this.helper.hideSpinner();
        this.helper.showToastDanger('Error', err.error.message[Object.keys(err.error.message)[0]][0]);
      });
    }
  }

}
