import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete-pay',
  templateUrl: './modal-delete-pay.component.html',
  styleUrls: ['./modal-delete-pay.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalDeletePayComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDeletePayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  cancelAction() {
    this.dialogRef.close();
  }

  saveAction() {
      this.dialogRef.close(this.data.payment)
  }
}
