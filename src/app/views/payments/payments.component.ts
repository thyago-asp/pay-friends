import { AlertService } from 'src/app/services/alert.service';
import { ModalDeletePayComponent } from './../../components/modal-delete-pay/modal-delete-pay.component';
import { IClient } from './../../interfaces/IClient';
import { ModalAddPayComponent } from './../../components/modal-add-pay/modal-add-pay.component';
import { PaymentPaginateRequest } from '../../models/PaymentPaginateRequest';
import { PaymentsService } from './../../services/payments.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Payments } from 'src/app/models/payments';
import { OrderTableEnum } from 'src/app/models/enums/orderTableEnum';
import * as _ from 'lodash';
import _orderBy from 'lodash/orderBy';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  currentUser: IClient;
  currentUserSubscription: Subscription;

  filter: PaymentPaginateRequest = new PaymentPaginateRequest();
  paymentParam: Payments;

  editModal: boolean = false;

  length: number;
  pageSizeOptions: number[] = [10, 25, 100];
  dataPayments = new Array<Payments>();

  pageSize = 10;
  pageEvent: PageEvent;
  nameUser: string;

  picTable = {
    columns: [
      { id: 'name', username: "username", name: 'Usuário', ordination: { orderType: OrderTableEnum.Ascending } },
      { id: 'title', name: 'Titulo', width: '10%', ordination: { orderType: OrderTableEnum.NotOrder } },
      { id: 'date', name: 'Data', width: '20%', ordination: { orderType: OrderTableEnum.NotOrder } },
      { id: 'value', name: 'Valor', ordination: { orderType: OrderTableEnum.Ascending } },
      { id: 'isPayed', name: 'Pago', ordination: { orderType: OrderTableEnum.Ascending } },
      { id: 'btn-actions', name: 'Ações' },
    ],
    data: [],
  }
  constructor(
    private paymentsService: PaymentsService,
    public dialog: MatDialog,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.paginator._intl.itemsPerPageLabel = "Itens por página";

    this.filter._order = "asc";
    this.filter._sort = "name";
    this.filter._page = 1;
    this.filter._start = 0;
    this.filter._end = 10;

    this.loadPayments();
  }

  /**
   * Função responsável por buscar todos os pagamentos registrados no sistema.
   */
  loadPayments() {

    const class$ = this.paymentsService.getPayments(this.filter);

    class$.subscribe(data => {

      this.length = data.headers.get('X-Total-Count');
      this.picTable.data = data.body;
    });
  }

  onOrder(column) {
    this.picTable.data = _.orderBy(this.picTable.data, column.id, (column.isDesc ? "desc" : "asc"));
  }

  filterUser() {
    this.filter.name_like = this.nameUser;

    this.loadPayments();
  }

  onChangePage(page) {

    this.filter._page = page.pageIndex + 1;
    this.filter._limit = page.pageSize;
    this.loadPayments();

  }

  /**
   * Função dinamica, que pode ser chamada tanto para a função editar pagamento quando criar pagamento.
   * Como ambas funcionalidades recebem, praticamentes os mesmo atributos.
   *
   * @param param (Valor vindo do Dialog de edição/criação de pagamento)
   */
  executeAction(param) {

    let payment = new Payments();
    payment.name = param.data.nameUser.value;
    payment.title = param.data.titleUser.value;
    payment.date = param.data.dateUser.value;
    payment.value = param.data.valueUser.value;
    payment.username = param.data.username.value;
    payment.isPayed =  param.data.isPayed.value;


    if (!param.edit) {
      const class$ = this.paymentsService.addNewPay(payment);

      class$.subscribe(data => {
        this.alertService.success("Cadastro realizado com sucesso.")
        this.loadPayments();
      })
    } else {
      payment.id = param.id;
      const class$ = this.paymentsService.editPay(payment);

      class$.subscribe(data => {
        this.alertService.success("Edição realizada com sucesso.")

        this.loadPayments();
      })
    }

  }

  /**
   * Função responsável por excluir o registro de pagamento.
   * @param result
   */
  executionActionDelete(result) {
    const class$ = this.paymentsService.deletePay(result.id);

    class$.subscribe(data => {
      this.loadPayments();
      this.alertService.success("Registro excluido com sucesso.")
    })
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalAddPayComponent, {
      width: '600px',
      data: { payment: this.paymentParam, edit: this.editModal }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.executeAction(result);

      }
    });

  }

  openModalDelete() {
    const dialogRef = this.dialog.open(ModalDeletePayComponent, {
      width: '500px',
      data: { payment: this.paymentParam }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.executionActionDelete(result);

      }
    });
  }

  /**
   * Função chamada pela view quando clicado no botão de deletar.
   * @param payment
   */
  deleteAction(payment) {
    this.paymentParam = payment;
    this.openModalDelete();
  }

  /**
   * Função chamada pela view quando clicado no botão de editar.
   * @param payment
   */
  editAction(payment) {
    this.paymentParam = payment;
    this.editModal = true;

    this.openModal();
  }
}
