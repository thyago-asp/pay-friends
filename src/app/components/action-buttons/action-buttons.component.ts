import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

  @Output() saveClick = new EventEmitter();
  @Output() cancelClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  saveAction() {
    this.saveClick.emit();
  }

  cancelAction() {
    this.cancelClick.emit();
  }
}
