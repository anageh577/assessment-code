import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

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
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SubProjectComponent } from './sub-project.component';
import { AddSubProjectComponent } from './add-sub-project/add-sub-project.component';
import { SubProjectTableComponent } from './sub-project-table/sub-project-table.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [SubProjectComponent, AddSubProjectComponent, SubProjectTableComponent],
  imports: [CommonModule,
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
    NbCheckboxModule,
    RouterModule,
    SharedModule,
    NgSelectModule,
    ReactiveFormsModule],
})
export class SubProjectsModule { }
