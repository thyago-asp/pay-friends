import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'success', text: message });
    setTimeout(() => {
      this.clear();
    }, 3000);
  }

  error(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'error', text: this.translate(message) });
    setTimeout(() => {
      this.clear();
    }, 3000);
  }

  clear() {
    // clear by calling subject.next() without parameters
    this.subject.next(null);
  }

  translate(message: string) {
    switch (message) {
      case "Email and password are required":
        return "E-mail e senha são obrigatórios";
        break;

      case "Email format is invalid":
        return "Formato do e-mail está inválido";

      case "Password is too short":
        return "A senha é muito curta";

      case "Incorrect password":
        return "Senha incorreta";

      case "Cannot find user":
        return "Usuário não encontrado";

      default:
        return message
        break;
    }
  }
}
