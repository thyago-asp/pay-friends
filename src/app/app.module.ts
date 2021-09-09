import { BrowserModule } from '@angular/platform-browser';
import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModules } from './shared/material/material-imports';
import { PaymentsComponent } from './views/payments/payments.component';
import { PaymentsService } from './services/payments.service';
import { HttpClientModule } from '@angular/common/http';
import { PicTableComponent } from './components/pic-table/pic-table.component';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { TableOrderComponent } from './components/pic-table/table-order/table-order.component';
import { ModalAddPayComponent } from './components/modal-add-pay/modal-add-pay.component';

import { LoginService } from './services/login.service';

import { ModalDeletePayComponent } from './components/modal-delete-pay/modal-delete-pay.component';
import { AlertComponent } from './components/alert/alert.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';
import { RouterModule } from '@angular/router';

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PaymentsComponent,
    PicTableComponent,
    TableOrderComponent,
    ModalAddPayComponent,
    ActionButtonsComponent,
    ModalDeletePayComponent,
    AlertComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ...MaterialModules,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    PaymentsService,
    AuthService,
    LoginService,
    PaymentsService,
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
