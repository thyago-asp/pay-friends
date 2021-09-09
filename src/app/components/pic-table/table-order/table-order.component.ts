import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['./table-order.component.scss']
})
export class TableOrderComponent implements OnInit {
  @Input() sLabel: string;
  @Input() nIndex: Number;

  constructor() { }

  ngOnInit() {
    this.drawType(this.nIndex);
  }

  drawType(value: any) {
    return this.nIndex === value;
  }

}
