import { IPayments } from './../../interfaces/IPayments';
import { Payments } from './../../models/payments';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  templateUrl: './modal-add-pay.component.html',
  styleUrls: ['./modal-add-pay.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalAddPayComponent implements OnInit {

  modalSection: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalAddPayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {

    this.modalSection = this.fb.group({
      nameUser: this.fb.control(null, [Validators.required]),
      valueUser: this.fb.control(null, [Validators.required]),
      dateUser: this.fb.control(null, [Validators.required]),
      titleUser: this.fb.control(null, []),
      username: this.fb.control(null, []),
      isPayed: this.fb.control(null, [])
    });



    if (this.data.edit) {
      let payment = this.data.payment;

      this.data.name = payment.name;
      this.data.value = payment.value;
      this.data.date = payment.date;
      this.data.title = payment.title;
      this.data.username = payment.username;
      this.data.isPayed = payment.isPayed;

    }
  }

  cancelAction() {
    this.dialogRef.close();
  }

  saveAction() {
    if (!this.modalSection.invalid) {
      this.dialogRef.close(
        {
          data: this.modalSection.controls,
          edit: this.data.edit,
          id: this.data.edit ? this.data.payment.id : ''
        })
    }
  }

}
