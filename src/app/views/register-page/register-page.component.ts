import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthenticationForm } from 'src/app/interfaces/IAuthenticationForm';
import { User } from 'src/app/interfaces/IClient';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  @Output() changeScren = new EventEmitter();

  registerForm: FormGroup;
  showPassword: boolean = false;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.showPassword = false

    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', []],
      lastname: ['', []]
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  register(e: Event) {
    e.preventDefault()

    this.errorMessage = undefined

    const { ...user } = <User>this.registerForm.value

    this.loginService.createAccount(user).subscribe({
      next: response => {
        console.log(response)
        if (response) {

          this.registerShow();
          this.alertService.success("Usuário criado com sucesso!");
        }
      },
      error: err => {
        console.log(err)
        this.alertService.error(err.error);
      }
    });

  }

  registerShow() {
    this.changeScren.emit();
  }
}
