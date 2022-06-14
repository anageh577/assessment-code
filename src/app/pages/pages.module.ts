import { ReportsModule } from './reports/reports-module';
import { TestIntegrationModule } from './test-integration/test-integration.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PropertiesModule } from './properties/properties.module';
import { LeasesModule } from './leases/leases.module';
import { InvoicesModule } from './invoices/invoices-module';
import { BanksModule } from './banks/banks.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { CompanyModule } from './company/company.module';
import { ProjectsModule } from './projects/projects.module';
import { CountryModule } from './country/country.module';
import { UnitsModule } from './units/units.module';
import { ProfileModule } from './profile/profile.module';
import { BuildingsModule } from './buildings/buildings.module';
import { TenantModule } from './tenant/tenant.module';
import { ContractsModule } from './contracts/contracts.module';
import { SubProjectsModule } from './sub-project/sub-project.module';
import { ProjectStatusModule } from './project-status/project-status.module';
import { AuthModule } from './auth/auth.module';
import { Userrole } from './user-roles';
import { ToastrModule } from 'ngx-toastr';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { PayerDashboardComponent } from './dashboards/payer-dashboard/payer-dashboard.component';
import { PendingPaymentsComponent } from './dashboards/payer-dashboard/pending-payments/pending-payments.component';
import { PaymentHistoryComponent } from './dashboards/payer-dashboard/payment-history/payment-history.component';
import { Chart3dModule } from './dashboard/chart3dpie/chart3dpie.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    AuthModule,
    NbMenuModule,
    MiscellaneousModule,
    PropertiesModule,
    LeasesModule,
    InvoicesModule,
    BanksModule,
    ReactiveFormsModule,
    SharedModule,
    ProjectsModule,
    CompanyModule,
    CountryModule,
    UnitsModule,
    ProfileModule,
    BuildingsModule,
    TenantModule,
    ContractsModule,
    SubProjectsModule,
    ProjectStatusModule,
    TestIntegrationModule,
    ReportsModule,
    Chart3dModule,
    Userrole,
    ToastrModule,
    MaintenanceModule,
    NzButtonModule,
    NzDatePickerModule,
  ],
  declarations: [PagesComponent, PayerDashboardComponent, PendingPaymentsComponent, PaymentHistoryComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
