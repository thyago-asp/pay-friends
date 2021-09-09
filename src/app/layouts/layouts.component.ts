import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IClient } from '../interfaces/IClient';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {
  currentUser: IClient;
  currentUserSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

}
