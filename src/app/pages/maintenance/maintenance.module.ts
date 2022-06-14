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
  NbCheckboxModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms'; import { MaintenanceComponent } from './maintenance.component';
import { MaintainanceTableComponent } from './maintainance-table/maintainance-table.component';
import { MaintainanceDetailsComponent } from './maintainance-details/maintainance-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';


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
    NbCheckboxModule,
    NbDatepickerModule,
    ThemeModule,
    Ng2SmartTableModule,
    TranslateModule,
    RouterModule,
    SharedModule,
    CommonModule

  ],
  declarations: [
    MaintenanceComponent,
    MaintainanceTableComponent,
    MaintainanceDetailsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MaintenanceModule {}
