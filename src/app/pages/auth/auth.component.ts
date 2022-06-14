import { Component } from '@angular/core';
// import { MENU_ITEMSen } from '../pages-menu';
@Component({
  selector: 'ngx-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
    <ngx-auth-one-column-layout>
        <router-outlet></router-outlet>
    </ngx-auth-one-column-layout>
  `,
})
export class AuthComponent {
  // menu = MENU_ITEMSen;

}
