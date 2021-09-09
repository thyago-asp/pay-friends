import { LayoutsComponent } from './layouts/layouts.component';
import { PaymentsComponent } from './views/payments/payments.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'payments',
        component: PaymentsComponent,
        canActivate: [AuthGuard]
      }
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
