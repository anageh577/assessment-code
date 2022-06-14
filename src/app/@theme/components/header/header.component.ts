import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from '../../../services/helpers/app.service';
import { EventsService } from '../../../services/helpers/events.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  userData: any = {
    'address1': null,
    'address2': null,
    'city': null,
    'country_id': null,
    'email': null,
    'full_name': 'Full name',
    'national_id': null,
    'national_id_type': null,
    'notification_tel': null,
    'tel1': null,
    'tel2': null,
    'tel3': null,
  };
  isLoadingUserData = true;
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private router: Router,
    private eventservice: EventsService,
    private tranlateService: TranslateService,
    private appservice: AppService) {
    this.eventservice.changeLangObser.subscribe(changeresponse => {
      this.tranlateService.get('Profile').subscribe(res => {
        this.userMenu[0].title = res;
      });
      this.tranlateService.get('Log out').subscribe(res => {
        this.userMenu[1].title = res;
      });
    });
    this.eventservice.updateprofileObser.subscribe(res => {
      this.getAuthenticatedUser();
    });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.getAuthenticatedUser();
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => { this.user = users.nick; });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item.title);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  onItemSelection(title) {
    // alert(title);

    if (title === 'Profile' || title === 'الحساب') {
      this.router.navigate(['./pages/profile']);
    } else if (title === 'Log out' || title === 'تسجيل الخروج') {
      const HBW = localStorage.getItem('HBW');
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('HBW', HBW);
      location.href = "auth/login";
    }
  }

  getAuthenticatedUser() {
    const id = localStorage.getItem('userId');
    if (id !== null) {
      this.appservice.GET('users/' + id).subscribe(res => {
        this.userData = res.user;
        if (!(this.userData?.logo)) {
          this.userData.logo = '../../../../assets/images/new-logo.png';
        }
        this.isLoadingUserData = false;
      }, err => {
        this.isLoadingUserData = false;
      });
    }
  }

}
