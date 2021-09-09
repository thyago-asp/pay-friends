import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { IAuthenticationRequest } from '../interfaces/IAuthenticationRequest';
import { User } from '../interfaces/IClient';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
