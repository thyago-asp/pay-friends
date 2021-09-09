import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { IAuthenticationForm } from 'src/app/interfaces/IAuthenticationForm'
import { LoginService } from 'src/app/services/login.service'
import { AuthService } from 'src/app/services/auth/auth.service'
import { AlertService } from 'src/app/services/alert.service'
// import 'url-search-params-polyfill'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  _accountForm: FormGroup
  showPassword: boolean
  errorMessage: string
  submitted: boolean = false;
  screenRegister: boolean = false;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    this.showPassword = false
    this._accountForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    let usr

    try {
      usr = await this.authService.getUser()
    } catch (error) {
      console.log(error)
    }

    if (usr) {
      this.router.navigateByUrl('/payments');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  login(e: Event) {
    e.preventDefault()

    this.errorMessage = undefined

    const { email, password } = <IAuthenticationForm>this._accountForm.value

    this.loginService.postLogin({
      email,
      password
    }).subscribe({
      next: response => {
        if (response) {
          this.authService.saveAuthData(response);
          this.router.navigateByUrl('/payments');
        }else{
          this.alertService.error("asd");
        }
      },
      error: err => {
        this.alertService.error(err.error);
      }
    });

  }



  registerShow(){
    this.alertService.clear();
    this.screenRegister = !this.screenRegister;
  }
  // convenience getter for easy access to form fields
  get f() { return this._accountForm.controls; }
}
