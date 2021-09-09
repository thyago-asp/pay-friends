import { IAuthenticationResponse } from './../interfaces/IAuthenticationResponse';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IAuthenticationRequest } from '../interfaces/IAuthenticationRequest'
import { toHttpParams } from '../shared/http-params-extensions';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/IClient';

@Injectable()
export class LoginService {

  private post_login_url: string
  private post_create_url: string;

  private buildUrls(loginsUrl: string) {
    this.post_login_url = loginsUrl + environment.endpointLogin.routes.login;
    this.post_create_url = loginsUrl + environment.endpointLogin.routes.register;
  }

  constructor(private http: HttpClient) {
    this.buildUrls(environment.endpointLogin.url);
  }


  postLogin(authenticationRequest: IAuthenticationRequest) {
    return this.http.post<IAuthenticationResponse>(this.post_login_url, authenticationRequest, { withCredentials: true });
  }

  createAccount(userParam: User){
    return this.http.post(this.post_create_url, userParam);
  }

}
