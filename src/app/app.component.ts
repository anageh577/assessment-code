import { NavigationStart, Router } from '@angular/router';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { UserIdleService } from 'angular-user-idle';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import Swal from 'sweetalert2';
import { HelperService } from './services/helpers/helper.service';
@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet> <ngx-spinner></ngx-spinner>',
})
export class AppComponent implements OnInit {
  status: OnlineStatusType; // Enum provided by ngx-online-status
  onlineStatusCheck: any = OnlineStatusType;
  constructor(
    private analytics: AnalyticsService,
    public router: Router,
    private seoService: SeoService,
    private tranlateService: TranslateService,
    private userIdle: UserIdleService,
    private helper: HelperService,
    private onlineStatusService: OnlineStatusService
  ) {
    if (!(localStorage.getItem('HBW'))) {
      localStorage.setItem('HBW', 'true');
    }
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.status = status;
      if (this.status == 1) {
        Swal.fire({
          title: this.tranlateService.instant('You are back online'),
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.tranlateService.instant('Continue')
        });
      } else if (this.status == 0) {
        Swal.fire({
          title: this.tranlateService.instant('Check internet connection'),
          icon: 'warning',
          showCancelButton: true,
          showConfirmButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: this.tranlateService.instant('refresh')
        }).then(() => {
          window.location.reload();
        });
      }
    });
    if (localStorage.getItem('rental_lang') === 'en') {
      document.body.dir = 'ltr';
      this.tranlateService.use('en');
    } else if (localStorage.getItem('rental_lang') === 'ar') {
      document.body.dir = 'rtl';
      this.tranlateService.use('ar');
    } else {
      localStorage.setItem('rental_lang', 'en');
    }
    window.addEventListener('click', (e: any) => {
      if (e.target !== document.getElementById('menubtn')) {
        document
          .getElementById('dropdownmenu')
          ?.classList.remove('show-drop-down');
      }
    });

  }

  forceLogout() {
    this.router.navigate(['./auth/login']);
    // localStorage.clear();
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('user_type');
    localStorage.removeItem('remembered');
    sessionStorage.clear();
  }

  ngOnInit(): void {
    //For  session expiring
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe();
    this.userIdle.onTimeout().subscribe(() => {
      this.forceLogout();
      this.userIdle.resetTimer();
    });

    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    if (localStorage.getItem('remembered') === 'true') {
      return;
    } else {
      if (sessionStorage.getItem('userId')) {
        return;
      } else {
        const rental_lang = localStorage.getItem('rental_lang');
        const HBW = localStorage.getItem('HBW');
        localStorage.clear();
        localStorage.setItem('rental_lang', rental_lang);
        localStorage.setItem('HBW', HBW);
      }
    }
    this.router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        if (event['url'].includes('auth/login') || event['url'].includes('auth/register')) {
          const rental_lang = localStorage.getItem('rental_lang');
          const HBW = localStorage.getItem('HBW');
          localStorage.clear();
          localStorage.setItem('HBW', HBW);
          localStorage.setItem('rental_lang', rental_lang);
        }
      }
    });
  }
}
