import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthComponent } from './auth.component';
// import { AuthRoutingModule } from './auth.routing.module';
import { NbCheckboxModule, NbMenuModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbTreeGridModule,
    NbInputModule,
    NbDatepickerModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AuthRoutingModule } from './auth.routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EnternewpasswordComponent } from './enternewpassword/enternewpassword.component';
import { OtpComponent } from './otp/otp.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SettenantpasswordComponent } from './settenantpassword/settenantpassword.component';
@NgModule({
    imports: [
        NbMenuModule,

        AuthRoutingModule,
        FormsModule,
        NbCardModule,
        NbUserModule,
        NbButtonModule,
        NbTabsetModule,
        NbActionsModule,
        NbRadioModule,
        NbSelectModule,
        NbListModule,
        NbIconModule,
        NgxEchartsModule,
        NbTreeGridModule,
        NbInputModule,
        NbCheckboxModule,
        NbDatepickerModule,
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2SmartTableModule,
        NbToastrModule,
        NbThemeModule,
    ],
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        OtpComponent,
        ResetpasswordComponent,
        EnternewpasswordComponent,
        SettenantpasswordComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule { }
