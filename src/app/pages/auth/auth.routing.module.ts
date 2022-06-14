import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';

import { OtpComponent } from './otp/otp.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { EnternewpasswordComponent } from './enternewpassword/enternewpassword.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettenantpasswordComponent } from './settenantpassword/settenantpassword.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'OTP',
        component: OtpComponent,
      },
      {
        path: 'reset-password',
        component: ResetpasswordComponent,
      },
      {
        path: 'change-password',
        component: EnternewpasswordComponent,
      },
      {
        path: 'newPassword',
        component: SettenantpasswordComponent,
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
