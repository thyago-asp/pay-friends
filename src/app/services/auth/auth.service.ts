import { IClient } from '../../interfaces/IClient';
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject: BehaviorSubject<IClient>;
  public currentUser: Observable<IClient>;

  constructor(
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<IClient>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): IClient {
    return this.currentUserSubject.value;
  }

  saveAuthData(data) {
    localStorage.setItem('currentUser', JSON.stringify(data));
    this.currentUserSubject.next(data);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('');
  }

  getUser() {
    return localStorage.getItem('user');
  }
}
