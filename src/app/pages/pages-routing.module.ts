import { TestIntegrationComponent } from "./test-integration/test-integration.component";
import { InvoicesComponent } from "./invoices/invoices.component";
import { AddLeaseComponent } from "./leases/add-lease/add-lease.component";
import { ProjectDetialsComponent } from "./properties/project-details/project-details";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { PropertiesComponent } from "./properties/properties.component";
import { AddPropertyComponent } from "./properties/add-property/add-property.component";
import { LeasesComponent } from "./leases/leases.component";
import { BanksComponent } from "./banks/banks.component";
import { BankDetailsComponent } from "./banks/bank-details/bank-details.component";
import { AddBankComponent } from "./banks/add-bank/add-bank.component";

import { CompanyComponent } from "./company/company.component";
import { AddCompanyComponent } from "./company/add-company/add-company.component";
import { ProjectsComponent } from "./projects/projects.component";
import { AddProjectComponent } from "./projects/add-project/add-project.component";

import { CountryComponent } from "./country/country.component";
import { AddCountryComponent } from "./country/add-country/add-country.component";

import { UnitsComponent } from "./units/units.component";
import { AddUnitComponent } from "./units/add-unit/add-unit.component";

import { ProfileComponent } from "./profile/profile.component";
import { AdminProxyComponent } from "./profile/admin-proxy/admin-proxy.component";

import { BuildingsComponent } from "./buildings/buildings.component";
import { AddBuildingComponent } from "./buildings/add-building/add-building.component";

import { TenantComponent } from "./tenant/tenant.component";
import { AddTenantComponent } from "./tenant/add-tenant/add-tenant.component";

import { ContractsComponent } from "./contracts/contracts.component";
import { ContractDetailsComponent } from "./contracts/contract-details/contract-details.component";
import { AddContractsComponent } from "./contracts/add-contracts/add-contracts.component";
import { SubProjectComponent } from "./sub-project/sub-project.component";
import { AddSubProjectComponent } from "./sub-project/add-sub-project/add-sub-project.component";
import { ProjectStatusComponent } from "./project-status/project-status.component";
import { AddProjectStatusComponent } from "./project-status/add-project-status/add-project-status.component";
import { ViewUnitComponent } from "./units/view-unit/view-unit.component";
import { TransferComponent } from "./transfer/transfer.component";
import { ReportsComponent } from "./reports/reports.component";
import { BuildingUnitsComponent } from "./buildings/units/buildingsUnit.component";
import { ProjectUnitsComponent } from "./projects/units/projectUnits.component";
import {
  acountantRoutes,
  companyAdminRoutes,
  companyOperatorRoutes,
  landLordRoutes,
  managerRoutes,
  payerRoutes,
} from "./user-roles";
import { AppService } from "../services/helpers/app.service";
import { InvoiceDetailsComponent } from "./invoices/invoice-details/invoice-details.component";
import { EditInvoiceComponent } from "./invoices/edit-invoice/edit-invoice.component";
import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { MaintainanceDetailsComponent } from "./maintenance/maintainance-details/maintainance-details.component";
import { CompanyDashboardComponent } from "./dashboards/company-dashboard/company-dashboard.component";
import { PayerDashboardComponent } from "./dashboards/payer-dashboard/payer-dashboard.component";
import { Router, RouterModule, ROUTES, Routes } from "@angular/router";
import { PaymentHistoryComponent } from "./dashboards/payer-dashboard/payment-history/payment-history.component";
import { PendingPaymentsComponent } from "./dashboards/payer-dashboard/pending-payments/pending-payments.component";


let payerRoute: Routes = [{
  path: '',
  component: PagesComponent,
  children: payerRoutes
}]

let landLordRoute: Routes = [{
  path: '',
  component: PagesComponent,
  children: landLordRoutes
}]

let companyAdminRoute: Routes = [{
  path: '',
  component: PagesComponent,
  children: companyAdminRoutes
}]

let companyOperatorRoute: Routes = [{
  path: '',
  component: PagesComponent,
  children: companyOperatorRoutes
}]
let acountantRoute: Routes = [{
  path: '',
  component: PagesComponent,
  children: acountantRoutes
}]
let managerRoute: Routes = [{
  path: '',
  component: PagesComponent,
  children: managerRoutes
}]
let intialComponents = [
  PagesComponent,
  PayerDashboardComponent,
  CompanyDashboardComponent,
  PropertiesComponent,
  AddPropertyComponent,
  ProjectDetialsComponent,
  LeasesComponent,
  MaintenanceComponent,
  MaintainanceDetailsComponent,
  PaymentHistoryComponent,
  PendingPaymentsComponent,
  AddLeaseComponent,
  InvoicesComponent,
  InvoicesComponent,
  InvoiceDetailsComponent,
  EditInvoiceComponent,
  InvoicesComponent,
  TransferComponent,
  ReportsComponent,
  BanksComponent,
  BankDetailsComponent,
  AddBankComponent,
  AddBankComponent,
  ProjectsComponent,
  AddProjectComponent,
  AddProjectComponent,
  SubProjectComponent,
  AddSubProjectComponent,
  AddSubProjectComponent,
  ProjectStatusComponent,
  AddProjectStatusComponent,
  AddProjectStatusComponent,
  CompanyComponent,
  AddCompanyComponent,
  AddCompanyComponent,
  CountryComponent,
  AddCountryComponent,
  AddCountryComponent,
  UnitsComponent,
  AddUnitComponent,
  AddUnitComponent,
  ViewUnitComponent,
  ProfileComponent,
  TestIntegrationComponent,
  BuildingsComponent,
  BuildingUnitsComponent,
  ProjectUnitsComponent,
  AddBuildingComponent,
  AddBuildingComponent,
  TenantComponent,
  AddTenantComponent,
  AddTenantComponent,
  AdminProxyComponent,
  ContractsComponent,
  AddContractsComponent,
  AddContractsComponent,
  ContractDetailsComponent,
  CompanyDashboardComponent]

@NgModule({
  imports: [RouterModule.forChild([])],
  exports: [RouterModule],
  providers: [
    {
      provide: ROUTES,
      useFactory: () => {
        if (localStorage.getItem('user_type') == '1') {
          return landLordRoute;
        } else if (localStorage.getItem('user_type') == '2') {
          return payerRoute;
        } else if (localStorage.getItem('user_type') == '3') {
          return companyAdminRoute;
        } else if (localStorage.getItem('user_type') == '4') {
          return companyOperatorRoute;
        } else if (localStorage.getItem('user_type') == '5') {
          return acountantRoute;
        } else if (localStorage.getItem('user_type') == '6') {
          return managerRoute;
        }
      },
      multi: true
    },
  ],
  entryComponents: intialComponents
})
export class PagesRoutingModule { }
