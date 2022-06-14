import { TestIntegrationComponent } from './test-integration/test-integration.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { BanksComponent } from './banks/banks.component';
import { BankDetailsComponent } from './banks/bank-details/bank-details.component';
import { AddBankComponent } from './banks/add-bank/add-bank.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { CountryComponent } from './country/country.component';
import { AddCountryComponent } from './country/add-country/add-country.component';
import { UnitsComponent } from './units/units.component';
import { AddUnitComponent } from './units/add-unit/add-unit.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminProxyComponent } from './profile/admin-proxy/admin-proxy.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { AddBuildingComponent } from './buildings/add-building/add-building.component';
import { TenantComponent } from './tenant/tenant.component';
import { AddTenantComponent } from './tenant/add-tenant/add-tenant.component';
import { ContractsComponent } from './contracts/contracts.component';
import { AddContractsComponent } from './contracts/add-contracts/add-contracts.component';
import { ContractDetailsComponent } from './contracts/contract-details/contract-details.component';
import { SubProjectComponent } from './sub-project/sub-project.component';
import { AddSubProjectComponent } from './sub-project/add-sub-project/add-sub-project.component';
import { ProjectStatusComponent } from './project-status/project-status.component';
import { AddProjectStatusComponent } from './project-status/add-project-status/add-project-status.component';
import { ViewUnitComponent } from './units/view-unit/view-unit.component';
import { TransferComponent } from './transfer/transfer.component';
import { ReportsComponent } from './reports/reports.component';
import { BuildingUnitsComponent } from './buildings/units/buildingsUnit.component';
import { ProjectUnitsComponent } from './projects/units/projectUnits.component';
import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { InvoiceDetailsComponent } from './invoices/invoice-details/invoice-details.component';
import { EditInvoiceComponent } from './invoices/edit-invoice/edit-invoice.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MaintainanceDetailsComponent } from './maintenance/maintainance-details/maintainance-details.component';
import { EventsService } from '../services/helpers/events.service';
import { CompanyDashboardComponent } from './dashboards/company-dashboard/company-dashboard.component';
import { PayerDashboardComponent } from './dashboards/payer-dashboard/payer-dashboard.component';
import { PaymentHistoryComponent } from './dashboards/payer-dashboard/payment-history/payment-history.component';
import { PendingPaymentsComponent } from './dashboards/payer-dashboard/pending-payments/pending-payments.component';

const versionNumber = require('../../../package.json').version;

const dashboard = 'Dashboard';
const Requestmaintenance = 'Request Maintenance';
const receipts = 'Receipts';
const units = 'Units';
const contracts = 'Contracts';
const invoices = 'Invoices';
const payers = 'Payers';
const transfers = 'Transfers';
const reports = 'Reports';
const settings = 'Settings';
const projects = 'Projects';
const phase = 'Phase';
const project_status = 'Status';
const buildings = 'Buildings';
const banks = 'Banks';
const users = 'Users';
const maintenance = 'Maintenance';
const version = 'version '
let english;

export let landLordRoutes = [
  {
    path: 'dashboard/super',
    component: CompanyDashboardComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'invoices/:id',
    component: InvoicesComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'view-invoice/:id',
    component: InvoiceDetailsComponent,
    data: { breadcrumb: 'Home/invoices/edit' },
  },
  {
    path: 'edit-invoice/:id',
    component: EditInvoiceComponent,
    data: { breadcrumb: 'Home/invoices/edit' },
  },
  {
    path: 'invoices/:contractId/view',
    component: InvoicesComponent,
    data: { breadcrumb: 'invoices/:contractId/view' },
  },
  {
    path: 'transfers',
    component: TransferComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'banks',
    component: BanksComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'bank-details',
    component: BankDetailsComponent,
    data: { breadcrumb: 'bank-details' },
  },
  {
    path: 'add-bank',
    component: AddBankComponent,
    data: { breadcrumb: 'Home/banks/add new bank' },
  },
  {
    path: 'add-bank/:id/edit',
    component: AddBankComponent,
    data: { breadcrumb: 'Home/banks/edit' },
  },
  {
    path: 'country',
    component: CountryComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'country/add-country',
    component: AddCountryComponent,
    data: { breadcrumb: 'country/add-country' },
  },
  {
    path: 'country/add-country/:id/edit',
    component: AddCountryComponent,
    data: { breadcrumb: 'Home/country/edit' },
  },
  {
    path: 'units',
    component: UnitsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'units/add-unit',
    component: AddUnitComponent,
    data: { breadcrumb: 'Home/units/add new unit' },
  },
  {
    path: 'units/add-unit/:id/edit',
    component: AddUnitComponent,
    data: { breadcrumb: 'Home/units/edit' },
  },
  {
    path: 'units/view/:id',
    component: ViewUnitComponent,
    data: { breadcrumb: 'Home/units/edit' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payment',
    component: TestIntegrationComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payers',
    component: TenantComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payers/add-payer',
    component: AddTenantComponent,
    data: { breadcrumb: 'Home/payers/add new payer' },
  },
  {
    path: 'payers/add-payer/:id/edit',
    component: AddTenantComponent,
    data: { breadcrumb: 'Home/payers/edit' },
  },
  {
    path: 'contracts',
    component: ContractsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'contracts/add-contract',
    component: AddContractsComponent,
    data: { breadcrumb: 'Home/contracts/add new contract' },
  },
  {
    path: 'contracts/add-contract/:id/edit',
    component: AddContractsComponent,
    data: { breadcrumb: 'Home/contracts/edit' },
  },
  {
    path: 'contracts/contract-details/:id',
    component: ContractDetailsComponent,
    data: { breadcrumb: 'Home/contracts/contract details' },
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    data: { breadcrumb: '' }
  },
  {
    path: 'maintenance/maintenance-details/:id',
    component: MaintainanceDetailsComponent,
    data: { breadcrumb: 'Home/maintenance/edit' }
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { breadcrumb: '' },
  },
];
export let LandLorden: NbMenuItem[] = [
  {
    title: dashboard,
    icon: { icon: 'home', pack: 'home' },
    link: '/pages/dashboard/super',
  },
  {
    title: units,
    icon: { icon: 'unit', pack: 'unit' },
    link: '/pages/units',
  },
  {
    title: contracts,
    icon: { icon: 'contracts', pack: 'contracts' },
    link: '/pages/contracts',
  },
  {
    title: invoices,
    icon: { icon: 'invoice', pack: 'invoice' },
    link: '/pages/invoices',
  },
  {
    title: payers,
    icon: { icon: 'ten', pack: 'ten' },
    link: '/pages/payers',
  },
  {
    title: banks,
    link: '/pages/banks',
    icon: { icon: 'banks', pack: 'banks' },
  },
  {
    title: transfers,
    icon: { 'icon': 'trans', pack: 'trans' },
    link: '/pages/transfers',
  },
  {
    title: reports,
    icon: { 'icon': 'report', pack: 'report' },
    link: '/pages/reports',
  },
  {
    title: maintenance,
    icon: { 'icon': 'maintenance', pack: 'maintenance' },
    link: '/pages/maintenance',
  },
  {
    title: english,
    data: 'change-language',
    icon: { icon: 'lang', pack: 'lang' },
  },
  {
    title: version + versionNumber,
  }
];


export let payerRoutes = [
  {
    path: 'dashboard/payer',
    component: PayerDashboardComponent,
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'country',
    component: CountryComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'country/add-country',
    component: AddCountryComponent,
    data: { breadcrumb: 'country/add-country' },
  },
  {
    path: 'country/add-country/:id/edit',
    component: AddCountryComponent,
    data: { breadcrumb: 'Home/country/edit' },
  },

  {
    path: 'profile',
    component: ProfileComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payment',
    component: TestIntegrationComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payers',
    component: TenantComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payers/add-payer',
    component: AddTenantComponent,
    data: { breadcrumb: 'Home/payers/add new payer' },
  },
  {
    path: 'payers/add-payer/:id/edit',
    component: AddTenantComponent,
    data: { breadcrumb: 'Home/payers/edit' },
  },

  {
    path: 'contracts',
    component: ContractsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'contracts/add-contract',
    component: AddContractsComponent,
    data: { breadcrumb: 'Home/contracts/add new contract' },
  },
  {
    path: 'contracts/add-contract/:id/edit',
    component: AddContractsComponent,
    data: { breadcrumb: 'Home/contracts/edit' },
  },
  {
    path: 'contracts/contract-details/:id',
    component: ContractDetailsComponent,
    data: { breadcrumb: 'Home/contracts/contract details' },
  },
  {
    path: 'view-invoice/:id',
    component: InvoiceDetailsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'invoices/:id',
    component: InvoicesComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    data: { breadcrumb: 'Home/maintenance' }
  },
  {
    path: 'payment-history',
    component: PaymentHistoryComponent,
    data: { breadcrumb: 'Home/payment history' }
  },
  {
    path: 'pending-payments',
    component: PendingPaymentsComponent,
    data: { breadcrumb: 'Home/pending payments' }
  },
  {
    path: 'maintenance/maintenance-details/:id',
    component: MaintainanceDetailsComponent,
    data: { breadcrumb: 'Home/maintenance/maintenance details' }
  },
  {
    path: '',
    redirectTo: 'dashboard/payer',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { breadcrumb: '' },
  },
];
export let Payeren: NbMenuItem[] = [

  {
    title: dashboard,
    icon: { icon: 'home', pack: 'home' },
    link: '/pages/dashboard/payer',
  },
  {
    title: Requestmaintenance,
    icon: { icon: 'maintenance', pack: 'maintenance' },
    link: '/pages/maintenance',
  },
  {
    title: contracts,
    icon: { icon: 'contracts', pack: 'contracts' },
    link: '/pages/contracts',
  },
  {
    title: settings,
    icon: { icon: 'Settings', pack: 'Settings' },
    children: [
      {
        title: english,
        data: 'change-language',
        icon: { icon: 'lang', pack: 'lang' },
      }
    ],
  },
  {
    title: version + versionNumber,
  }
];



export let companyAdminRoutes = [
  {
    path: 'dashboard/super',
    component: CompanyDashboardComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'invoices/:id',
    component: InvoicesComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'view-invoice/:id',
    component: InvoiceDetailsComponent,
    data: { breadcrumb: 'Home/invoices/edit' },
  },
  {
    path: 'edit-invoice/:id',
    component: EditInvoiceComponent,
    data: { breadcrumb: 'Home/invoices/edit' },
  },
  {
    path: 'invoices/:contractId/view',
    component: InvoicesComponent,
    data: { breadcrumb: 'invoices/:contractId/view' },
  },
  {
    path: 'transfers',
    component: TransferComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'banks',
    component: BanksComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'bank-details',
    component: BankDetailsComponent,
    data: { breadcrumb: 'bank-details' },
  },
  {
    path: 'add-bank',
    component: AddBankComponent,
    data: { breadcrumb: 'Home/banks/add new bank' },
  },
  {
    path: 'add-bank/:id/edit',
    component: AddBankComponent,
    data: { breadcrumb: 'Home/banks/edit' },
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'projects/add-project',
    component: AddProjectComponent,
    data: { breadcrumb: 'Home/projects/add new project' },
  },
  {
    path: 'projects/add-project/:id/edit',
    component: AddProjectComponent,
    data: { breadcrumb: 'Home/projects/edit' },
  },
  {
    path: 'phases',
    component: SubProjectComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'phases/add-phase',
    component: AddSubProjectComponent,
    data: { breadcrumb: 'Home/phases/add new phase' },
  },
  {
    path: 'phases/add-phase/:id/edit',
    component: AddSubProjectComponent,
    data: { breadcrumb: 'Home/phases/edit' },
  },
  {
    path: 'projects-status',
    component: ProjectStatusComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'add-project-status',
    component: AddProjectStatusComponent,
    data: { breadcrumb: 'Home/projects/add new project status' },
  },
  {
    path: 'edit-projects-status/:id/edit',
    component: AddProjectStatusComponent,
    data: { breadcrumb: 'Home/projects status/edit' },
  },
  {
    path: 'country',
    component: CountryComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'country/add-country',
    component: AddCountryComponent,
    data: { breadcrumb: 'country/add-country' },
  },
  {
    path: 'country/add-country/:id/edit',
    component: AddCountryComponent,
    data: { breadcrumb: 'Home/country/edit' },
  },
  {
    path: 'units',
    component: UnitsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'units/add-unit',
    component: AddUnitComponent,
    data: { breadcrumb: 'Home/units/add new unit' },
  },
  {
    path: 'units/add-unit/:id/edit',
    component: AddUnitComponent,
    data: { breadcrumb: 'Home/units/edit' },
  },
  {
    path: 'units/view/:id',
    component: ViewUnitComponent,
    data: { breadcrumb: 'Home/units/edit' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payment',
    component: TestIntegrationComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'buildings',
    component: BuildingsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'buildings/buildingsUnits/:id',
    component: BuildingUnitsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'projects/projectUnits/:id',
    component: ProjectUnitsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'buildings/add-building',
    component: AddBuildingComponent,
    data: { breadcrumb: 'Home/building/add new building' },
  },
  {
    path: 'buildings/add-building/:id/edit',
    component: AddBuildingComponent,
    data: { breadcrumb: 'Home/buildings/edit' },
  },
  {
    path: 'payers',
    component: TenantComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payers/add-payer',
    component: AddTenantComponent,
    data: { breadcrumb: 'Home/payers/add new payer' },
  },
  {
    path: 'payers/add-payer/:id/edit',
    component: AddTenantComponent,
    data: { breadcrumb: 'Home/payers/edit' },
  },
  {
    path: 'proxy',
    component: AdminProxyComponent,
    data: { breadcrumb: 'proxy' },
  },
  {
    path: 'contracts',
    component: ContractsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'contracts/add-contract',
    component: AddContractsComponent,
    data: { breadcrumb: 'Home/contracts/add new contract' },
  },
  {
    path: 'contracts/add-contract/:id/edit',
    component: AddContractsComponent,
    data: { breadcrumb: 'Home/contracts/edit' },
  },
  {
    path: 'contracts/contract-details/:id',
    component: ContractDetailsComponent,
    data: { breadcrumb: 'Home/contracts/contract details' },
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    data: { breadcrumb: '' }
  },
  {
    path: 'maintenance/maintenance-details/:id',
    component: MaintainanceDetailsComponent,
    data: { breadcrumb: 'Home/maintenance/edit' }
  },
  {
    path: '',
    redirectTo: 'dashboard/super',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { breadcrumb: '' },
  },
];
export let Companyen: NbMenuItem[] = [

  {
    title: dashboard,
    icon: { icon: 'home', pack: 'home' },
    link: '/pages/dashboard/super',
  },
  {
    title: units,
    icon: { icon: 'unit', pack: 'unit' },
    link: '/pages/units',
  },
  {
    title: contracts,
    icon: { icon: 'contracts', pack: 'contracts' },
    link: '/pages/contracts',
  },
  {
    title: invoices,
    icon: { icon: 'invoice', pack: 'invoice' },
    link: '/pages/invoices',
  },
  {
    title: payers,
    icon: { icon: 'ten', pack: 'ten' },
    link: '/pages/payers',
  },
  {
    title: banks,
    link: '/pages/banks',
    icon: { icon: 'banks', pack: 'banks' },
  },
  {
    title: transfers,
    icon: { 'icon': 'trans', pack: 'trans' },
    link: '/pages/transfers',
  },
  {
    title: reports,
    icon: { 'icon': 'report', pack: 'report' },
    link: '/pages/reports',
  },
  {
    title: maintenance,
    icon: { 'icon': 'maintenance', pack: 'maintenance' },
    link: '/pages/maintenance',
  },
  {
    title: settings,
    icon: { icon: 'Settings', pack: 'Settings' },
    children: [
      {
        title: projects,
        icon: { icon: 'projects', pack: 'projects' },
        children: [
          {
            title: projects,
            link: '/pages/projects',
            icon: { icon: 'projects', pack: 'projects' },
          },
          {
            title: phase,
            link: '/pages/phases',
            icon: { icon: 'sub-projects', pack: 'sub-projects' },
          },
          {
            title: project_status,
            link: '/pages/projects-status',
            icon: { icon: 'status', pack: 'status' },

          },

        ],
      },
      {
        title: buildings,
        link: '/pages/buildings',
        icon: { icon: 'building', pack: 'building' },
      },
      {
        title: users,
        link: '/pages/test',
        icon: { icon: 'users', pack: 'users' },

      }
    ],
  },
  {
    title: english,
    data: 'change-language',
    icon: { icon: 'lang', pack: 'lang' },
  },
  {
    title: version + versionNumber,
  }

];


export let companyOperatorRoutes = [
  {
    path: 'dashboard/super',
    component: CompanyDashboardComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'invoices/:id',
    component: InvoicesComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'view-invoice/:id',
    component: InvoiceDetailsComponent,
    data: { breadcrumb: 'Home/invoices/edit' },
  },
  {
    path: 'edit-invoice/:id',
    component: EditInvoiceComponent,
    data: { breadcrumb: 'Home/invoices/edit' },
  },
  {
    path: 'invoices/:contractId/view',
    component: InvoicesComponent,
    data: { breadcrumb: 'invoices/:contractId/view' },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'country',
    component: CountryComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'country/add-country',
    component: AddCountryComponent,
    data: { breadcrumb: 'country/add-country' },
  },
  {
    path: 'country/add-country/:id/edit',
    component: AddCountryComponent,
    data: { breadcrumb: 'Home/country/edit' },
  },
  {
    path: 'units',
    component: UnitsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'units/add-unit',
    component: AddUnitComponent,
    data: { breadcrumb: 'Home/units/add new unit' },
  },
  {
    path: 'units/add-unit/:id/edit',
    component: AddUnitComponent,
    data: { breadcrumb: 'Home/units/edit' },
  },
  {
    path: 'units/view/:id',
    component: ViewUnitComponent,
    data: { breadcrumb: 'Home/units/edit' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payers',
    component: TenantComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payers/add-payer',
    component: AddTenantComponent,
    data: { breadcrumb: 'Home/payers/add new payer' },
  },
  {
    path: 'payers/add-payer/:id/edit',
    component: AddTenantComponent,
    data: { breadcrumb: 'Home/payers/edit' },
  },
  {
    path: 'contracts',
    component: ContractsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'contracts/add-contract',
    component: AddContractsComponent,
    data: { breadcrumb: 'Home/contracts/add new contract' },
  },
  {
    path: 'contracts/add-contract/:id/edit',
    component: AddContractsComponent,
    data: { breadcrumb: 'Home/contracts/edit' },
  },
  {
    path: 'contracts/contract-details/:id',
    component: ContractDetailsComponent,
    data: { breadcrumb: 'Home/contracts/contract details' },
  },
  {
    path: '',
    redirectTo: 'dashboard/super',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { breadcrumb: '' },
  },
];
export let CompanyOperationen: NbMenuItem[] = [

  {
    title: dashboard,
    icon: { icon: 'home', pack: 'home' },
    link: '/pages/dashboard/super',
  },
  {
    title: units,
    icon: { icon: 'unit', pack: 'unit' },
    link: '/pages/units',
  },
  {
    title: contracts,
    icon: { icon: 'contracts', pack: 'contracts' },
    link: '/pages/contracts',
  },
  {
    title: invoices,
    icon: { icon: 'invoice', pack: 'invoice' },
    link: '/pages/invoices',
  },
  {
    title: reports,
    icon: { 'icon': 'report', pack: 'report' },
    link: '/pages/reports',
  },
  {
    title: settings,
    icon: { icon: 'Settings', pack: 'Settings' },
    children: [
      {
        title: english,
        data: 'change-language',
        icon: { icon: 'lang', pack: 'lang' },
      }
    ],
  },
  {
    title: version + versionNumber,
  }
];


export let acountantRoutes = [
  {
    path: 'dashboard/super',
    component: CompanyDashboardComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'invoices/:id',
    component: InvoicesComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'view-invoice/:id',
    component: InvoiceDetailsComponent,
    data: { breadcrumb: 'Home/invoices/edit' },
  },
  {
    path: 'edit-invoice/:id',
    component: EditInvoiceComponent,
    data: { breadcrumb: 'Home/invoices/edit' },
  },
  {
    path: 'invoices/:contractId/view',
    component: InvoicesComponent,
    data: { breadcrumb: 'invoices/:contractId/view' },
  },
  {
    path: 'transfers',
    component: TransferComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: { breadcrumb: '' },
  },


  {
    path: 'country',
    component: CountryComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'country/add-country',
    component: AddCountryComponent,
    data: { breadcrumb: 'country/add-country' },
  },
  {
    path: 'country/add-country/:id/edit',
    component: AddCountryComponent,
    data: { breadcrumb: 'Home/country/edit' },
  },
  {
    path: 'units',
    component: UnitsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'units/add-unit',
    component: AddUnitComponent,
    data: { breadcrumb: 'Home/units/add new unit' },
  },
  {
    path: 'units/add-unit/:id/edit',
    component: AddUnitComponent,
    data: { breadcrumb: 'Home/units/edit' },
  },
  {
    path: 'units/view/:id',
    component: ViewUnitComponent,
    data: { breadcrumb: 'Home/units/edit' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payment',
    component: TestIntegrationComponent,
    data: { breadcrumb: '' },
  },

  {
    path: 'payers',
    component: TenantComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payers/add-payer',
    component: AddTenantComponent,
    data: { breadcrumb: 'Home/payers/add new payer' },
  },
  {
    path: 'payers/add-payer/:id/edit',
    component: AddTenantComponent,
    data: { breadcrumb: 'Home/payers/edit' },
  },

  {
    path: 'contracts',
    component: ContractsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'contracts/add-contract',
    component: AddContractsComponent,
    data: { breadcrumb: 'Home/contracts/add new contract' },
  },
  {
    path: 'contracts/add-contract/:id/edit',
    component: AddContractsComponent,
    data: { breadcrumb: 'Home/contracts/edit' },
  },
  {
    path: 'contracts/contract-details/:id',
    component: ContractDetailsComponent,
    data: { breadcrumb: 'Home/contracts/contract details' },
  },
  {
    path: '',
    redirectTo: 'dashboard/super',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { breadcrumb: '' },
  },
];
export let Acountanten: NbMenuItem[] = [

  {
    title: dashboard,
    icon: { icon: 'home', pack: 'home' },
    link: '/pages/dashboard/super',
  },
  {
    title: units,
    icon: { icon: 'unit', pack: 'unit' },
    link: '/pages/units',
  },
  {
    title: contracts,
    icon: { icon: 'contracts', pack: 'contracts' },
    link: '/pages/contracts',
  },
  {
    title: invoices,
    icon: { icon: 'invoice', pack: 'invoice' },
    link: '/pages/invoices',
  },
  {
    title: payers,
    icon: { icon: 'ten', pack: 'ten' },
    link: '/pages/payers',
  },
  {
    title: transfers,
    icon: { 'icon': 'trans', pack: 'trans' },
    link: '/pages/transfers',
  },
  {
    title: reports,
    icon: { 'icon': 'report', pack: 'report' },
    link: '/pages/reports',
  },
  {
    title: settings,
    icon: { icon: 'Settings', pack: 'Settings' },
    children: [
      {
        title: english,
        data: 'change-language',
        icon: { icon: 'lang', pack: 'lang' },
      },

    ],
  },
  {
    title: version + versionNumber,
  }
];


export let managerRoutes = [
  {
    path: 'dashboard/super',
    component: CompanyDashboardComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'invoices/:id',
    component: InvoicesComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'view-invoice/:id',
    component: InvoiceDetailsComponent,
    data: { breadcrumb: 'Home/invoices/edit' },
  },
  {
    path: 'edit-invoice/:id',
    component: EditInvoiceComponent,
    data: { breadcrumb: 'Home/invoices/edit' },
  },
  {
    path: 'invoices/:contractId/view',
    component: InvoicesComponent,
    data: { breadcrumb: 'invoices/:contractId/view' },
  },
  {
    path: 'transfers',
    component: TransferComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: { breadcrumb: '' },
  },


  {
    path: 'country',
    component: CountryComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'country/add-country',
    component: AddCountryComponent,
    data: { breadcrumb: 'country/add-country' },
  },
  {
    path: 'country/add-country/:id/edit',
    component: AddCountryComponent,
    data: { breadcrumb: 'Home/country/edit' },
  },
  {
    path: 'units',
    component: UnitsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'units/add-unit',
    component: AddUnitComponent,
    data: { breadcrumb: 'Home/units/add new unit' },
  },
  {
    path: 'units/add-unit/:id/edit',
    component: AddUnitComponent,
    data: { breadcrumb: 'Home/units/edit' },
  },
  {
    path: 'units/view/:id',
    component: ViewUnitComponent,
    data: { breadcrumb: 'Home/units/edit' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payment',
    component: TestIntegrationComponent,
    data: { breadcrumb: '' },
  },

  {
    path: 'payers',
    component: TenantComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'payers/add-payer',
    component: AddTenantComponent,
    data: { breadcrumb: 'Home/payers/add new payer' },
  },
  {
    path: 'payers/add-payer/:id/edit',
    component: AddTenantComponent,
    data: { breadcrumb: 'Home/payer/edit' },
  },

  {
    path: 'contracts',
    component: ContractsComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'contracts/add-contract',
    component: AddContractsComponent,
    data: { breadcrumb: 'Home/contracts/add new contract' },
  },
  {
    path: 'contracts/add-contract/:id/edit',
    component: AddContractsComponent,
    data: { breadcrumb: 'Home/contracts/edit' },
  },
  {
    path: 'contracts/contract-details/:id',
    component: ContractDetailsComponent,
    data: { breadcrumb: 'Home/contracts/contract details' },
  },
  {
    path: '',
    redirectTo: 'dashboard/super',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { breadcrumb: '' },
  },
];
export let Manageren: NbMenuItem[] = [
  {
    title: dashboard,
    icon: { icon: 'home', pack: 'home' },
    link: '/pages/dashboard/super',
  },
  {
    title: units,
    icon: { icon: 'unit', pack: 'unit' },
    link: '/pages/units',
  },
  {
    title: contracts,
    icon: { icon: 'contracts', pack: 'contracts' },
    link: '/pages/contracts',
  },
  {
    title: invoices,
    icon: { icon: 'invoice', pack: 'invoice' },
    link: '/pages/invoices',
  },
  {
    title: payers,
    icon: { icon: 'ten', pack: 'ten' },
    link: '/pages/payers',
  },
  {
    title: transfers,
    icon: { 'icon': 'trans', pack: 'trans' },
    link: '/pages/transfers',
  },
  {
    title: reports,
    icon: { 'icon': 'report', pack: 'report' },
    link: '/pages/reports',
  },
  {
    title: settings,
    icon: { icon: 'Settings', pack: 'Settings' },
    children: [
      {
        title: english,
        data: 'change-language',
        icon: { icon: 'lang', pack: 'lang' },
      }
    ],
  },
  {
    title: version + versionNumber,
  }
];

@NgModule({})
export class Userrole {
  constructor(
    private translateService: TranslateService,
    private eventService: EventsService) {
    this.eventService.changeLangObser.subscribe(changelangresponse => {

      this.translateService.get(dashboard).subscribe(res => {
        LandLorden[0].title = res;
        Payeren[0].title = res;
        Companyen[0].title = res;
        CompanyOperationen[0].title = res;
        Acountanten[0].title = res;
        Manageren[0].title = res;
      });
      this.translateService.get(units).subscribe(res => {
        LandLorden[1].title = res;
        Companyen[1].title = res;
        CompanyOperationen[1].title = res;
        Acountanten[1].title = res;
        Manageren[1].title = res;
      });
      this.translateService.get(contracts).subscribe(res => {
        LandLorden[2].title = res;
        Payeren[2].title = res;
        Companyen[2].title = res;
        CompanyOperationen[2].title = res;
        Acountanten[2].title = res;
        Manageren[2].title = res;
      });
      this.translateService.get(invoices).subscribe(res => {
        LandLorden[3].title = res;
        Companyen[3].title = res;
        CompanyOperationen[3].title = res;
        Acountanten[3].title = res;
        Manageren[3].title = res;
      });
      this.translateService.get(payers).subscribe(res => {
        LandLorden[4].title = res;
        Companyen[4].title = res;
        CompanyOperationen[4].title = res;
        Acountanten[4].title = res;
        Manageren[4].title = res;
      });
      this.translateService.get(banks).subscribe(res => {
        LandLorden[5].title = res;
        Companyen[5].title = res;
      });
      this.translateService.get(transfers).subscribe(res => {
        LandLorden[6].title = res;
        Companyen[6].title = res;
        Acountanten[5].title = res;
        Manageren[5].title = res;
      });
      this.translateService.get(reports).subscribe(res => {
        LandLorden[7].title = res;
        Companyen[7].title = res;
        Acountanten[6].title = res;
        Manageren[6].title = res;
      });
      this.translateService.get(settings).subscribe(res => {
        Payeren[3].title = res;
        Companyen[9].title = res;
        CompanyOperationen[5].title = res;
        Acountanten[7].title = res;
        Manageren[7].title = res;
      });
      this.translateService.get(maintenance).subscribe(res => {
        Payeren[1].title = res;
        Companyen[8].title = res;
        LandLorden[8].title = res;
      });
      this.translateService.get(projects).subscribe(res => {
        Companyen[9].children[0].title = res;
      });
      this.translateService.get(projects).subscribe(res => {
        Companyen[9].children[0].children[0].title = res;
      });
      this.translateService.get(phase).subscribe(res => {
        Companyen[9].children[0].children[1].title = res;
      });
      this.translateService.get(project_status).subscribe(res => {
        Companyen[9].children[0].children[2].title = res;
      });
      this.translateService.get(buildings).subscribe(res => {
        Companyen[9].children[1].title = res;
      });
      this.translateService.get(users).subscribe(res => {
        Companyen[9].children[2].title = res;
      });
      this.translateService.get('english').subscribe(res => {
        LandLorden[9].title = res;
        Payeren[3].children[0].title = res;
        Companyen[10].title = res;
        CompanyOperationen[5].children[0].title = res;
        Acountanten[7].children[0].title = res;
        Manageren[7].children[0].title = res;
        if (localStorage.getItem('rental_lang') == 'en' && res == 'english') {
          this.translateService.get('عربي').subscribe(res => {
            LandLorden[9].title = res;
            Payeren[3].children[0].title = res;
            Companyen[10].title = res;
            CompanyOperationen[5].children[0].title = res;
            Acountanten[7].children[0].title = res;
            Manageren[7].children[0].title = res;
          });
        }
      });
    });
  }
}

// var users = 'Users';
