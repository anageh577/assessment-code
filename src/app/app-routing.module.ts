import { ExtraOptions, PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserTypeComponent } from './pages/profile/user-type/user-type.component';
import { AuthGuard } from './services/auth/auth.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PayerInfoComponent } from './pages/payer-info/payer-info.component';
import { PrintInvoiceComponent } from './pages/invoices/print-invoice/print-invoice.component';
import { NBEComponent } from './pages/NBE/NBE.component';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: ':id',
    component: CheckoutComponent,
  },
  {
    path: 'print/:id',
    component: PrintInvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payer-info/:price/:invoiceId',
    component: PayerInfoComponent,
  },
  {
    path: 'NBE/success/:invoiceId/:price',
    component: NBEComponent,
  },
  {
    path: 'profile/type',
    component: UserTypeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'receipt/:id',
    component: ReceiptComponent,
    data: { breadcrumb: '' },
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pages'
  },
];
export const routesAuthenticated: Routes = [
  {
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: ':id',
    component: CheckoutComponent,
  },
  {
    path: 'print/:id',
    component: PrintInvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payer-info/:price/:invoiceId',
    component: PayerInfoComponent,
  },
  {
    path: 'NBE/success/:invoiceId/:price',
    component: NBEComponent,
  },
  {
    path: 'profile/type',
    component: UserTypeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'receipt/:id',
    component: ReceiptComponent,
    data: { breadcrumb: '' },
  },
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pages'
  },
];

const config: ExtraOptions = {
  useHash: false,
  preloadingStrategy: PreloadAllModules,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    if (localStorage.getItem('userId') && localStorage.getItem('user_type')) {
      routes[9] = {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full'
      }
      this.router.resetConfig(routes);
    }
  }
}
