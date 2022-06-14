import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SharedModule } from './shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserIdleModule } from 'angular-user-idle';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PayerInfoModule } from './pages/payer-info/payer-info.module';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ToastrModule } from 'ngx-toastr';
import { TimeoutRequstInterceptor } from './services/intercepts/timeout-requst.interceptor';
import { OnlineStatusModule } from 'ngx-online-status';
import { InterceptInterceptor } from './services/intercepts/intercept.interceptor';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, CheckoutComponent, ReceiptComponent, PrivacyPolicyComponent],
  imports: [
    BrowserModule,
    NbCheckboxModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    PayerInfoModule,
    ReactiveFormsModule,
    OnlineStatusModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    SharedModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    UserIdleModule.forRoot({ idle: 1200, timeout: 1, ping: 1 }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutRequstInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
