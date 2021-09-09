export class PaymentPaginateRequest {
  _limit: number;
  _page: number = 1;
  _sort: string;
  _order: string;
  _start: number;
  _end: number;
  name_like: string;
}
