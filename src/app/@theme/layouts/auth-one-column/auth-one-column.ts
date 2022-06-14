import { Component } from '@angular/core';

@Component({
  selector: 'ngx-auth-one-column-layout',
  styleUrls: ['./auth-one-column.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-column style="background-color: white;padding: 0 !important;">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class AuthOneColumnLayoutComponent { }
