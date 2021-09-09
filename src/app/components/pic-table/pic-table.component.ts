import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderTableEnum } from 'src/app/models/enums/orderTableEnum';
import { FilterState } from 'src/app/services/states/FilterState';

interface Column {
  id: string;
  name?: string;
  width?: string;
  count?: number;
  ordination?: {
    orderType: number;
  };
  ngClass?: string;
  ngStyle?: object;
  actionButton?: any;
}

/**
 * Essa é uma tabela personalizada. Eu criei esse componente pensando em grandes funcionalidades que podemos fazer com ela.
 * Além disso, podemos personalizar com quantos tipos e padrões de colunas forem necessarias.
 */
@Component({
  selector: 'app-pic-table',
  templateUrl: './pic-table.component.html',
  styleUrls: ['./pic-table.component.scss']
})
export class PicTableComponent implements OnInit {
  @Input() preloader: boolean;
  @Input() columns: Column[] = [];
  @Input() data: any[];

  @Output() sortColumn = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor(
    private filterState: FilterState
  ) { }

  ngOnInit(): void {

    const stateOrdination = this.filterState.states.ordination;
    const newColumns = this.columns.map(col => {
      if (col.id === stateOrdination.fieldNameSort && col.ordination) {
        if (stateOrdination.isDesc) {
          return { ...col, ordination: { orderType: OrderTableEnum.Descending } };
        } else {
          return { ...col, ordination: { orderType: OrderTableEnum.Ascending } };
        }
      } else if (col.ordination) {
        return { ...col, ordination: { orderType: OrderTableEnum.NotOrder } };
      } else {
        return col;
      }
    });
    this.columns = newColumns;

  }


  onSortColumn(column) {

    let isDesc: boolean;
    const columnOrderType = column.ordination.orderType;
    if (columnOrderType === OrderTableEnum.Descending || columnOrderType === OrderTableEnum.NotOrder) {
      column.ordination.orderType = OrderTableEnum.Ascending;
      isDesc = false;
    } else if (columnOrderType === OrderTableEnum.Ascending) {
      column.ordination.orderType = OrderTableEnum.Descending;
      isDesc = true;
    }

    const newColumns = this.columns.map(col => {
      if (col.id !== column.id && col.ordination) {
        return { ...col, ordination: { orderType: OrderTableEnum.NotOrder } };
      } else {
        return col;
      }
    });
    this.columns = newColumns;

    this.sortColumn.emit({ id: column.id, isDesc });
  }

  deletePayment(event){
    this.delete.emit(event);
  }

  editPayment(event){

    this.edit.emit(event);
  }

}
