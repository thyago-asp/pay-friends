import { Payments } from './../models/payments';
import { IPayments } from './../interfaces/IPayments';
import { PaymentPaginateRequest } from '../models/PaymentPaginateRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { toHttpParams } from '../shared/http-params-extensions';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentsService {
  private get_all_payments: string;
  private post_add_new_pay: string;
  private put_edit_pay: string;
  private delete_pay: string;

  /**
   * Pensando em um sistema que tem a possibilidade de expansão, deixar dinâmico a busca
   * de serviços que possam estar em diferentes servidores, pode ser tratada facilmente.
   * @param paymentsUrl
   */
  private buildUrls(paymentsUrl: string) {
    this.get_all_payments = paymentsUrl + environment.endpointPayments.routes.get_all_payments;
    this.post_add_new_pay = paymentsUrl + environment.endpointPayments.routes.add_new_pay;
    this.put_edit_pay = paymentsUrl + environment.endpointPayments.routes.edit_pay;
    this.delete_pay =  paymentsUrl + environment.endpointPayments.routes.delete_pay;
  }

  constructor(private http: HttpClient) {
    this.buildUrls(environment.endpointPayments.url);
  }

  /**
   * Buscamos sem filtro todos os pagamentos do banco.
   * @returns todos os registros de pagamentos.
   */
  getPayments(paramPayment: PaymentPaginateRequest): Observable<any>{
    const { ...others } = paramPayment;
    let params = toHttpParams(others);
    return this.http.get(this.get_all_payments, {params, observe: 'response'});
  }

  /**
   *  Função para adicionarmos um novo pagamento ao banco.
   * @param paymentParam
   * @returns
   */
  addNewPay(paymentParam: Payments){
    return this.http.post(this.post_add_new_pay, paymentParam);
  }

  editPay(paymentParam: Payments){
    return this.http.put(this.put_edit_pay.replace('{idPayment}', paymentParam.id), paymentParam);
  }

  deletePay(id: string){
    return this.http.delete(this.delete_pay.replace('{idPayment}', id))
  }
}
