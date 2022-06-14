import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `

  <ng-container >

    <span class="created-by">
      Copyright 2022@Boyot Software company
      <!-- <b><a href="https://boyot.app" target="_blank">Boyot Developers</a></b> -->

    </span>
    <div class="termsAndConditions">
      <a href="">{{'TERMS & CONDITIONS' | translate}}</a>
      &nbsp;
      <a href="">{{'PRIVACY POLICY' | translate}}</a>
      <a href="" class="help"> <i class="fas fa-question-circle"></i> {{'HELP' | translate}}</a>
      <!-- <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a> -->
    </div>
  </ng-container>

  `,
})
export class FooterComponent { }
