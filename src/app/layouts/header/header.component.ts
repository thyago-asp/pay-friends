import { IClient } from './../../interfaces/IClient';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() client: IClient;

  placeHolderImg = "../../../assets/images/maria-luiza.png";
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  logout () {
    this.authService.logout();
  }

  editUser (){
    // this.router.navigateByUrl('/edit-user-profile')
  }
}
