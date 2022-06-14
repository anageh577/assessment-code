import { SharedModule } from './../../shared.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BanksComponent } from './banks.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
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
    ThemeModule,
    Ng2SmartTableModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ],
  declarations: [BanksComponent, AddBankComponent, BankDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BanksModule { }
