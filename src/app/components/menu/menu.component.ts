import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public user: any = {
    status: false,
    email: '',
  };
  public loginMenu = true;


  constructor(private changeMenu: MenuService) { }

  ngOnInit() {
    this.changeMenu.userEmitter.subscribe(data => {
      if ( data === null) {
        this.user.status = false;
        this.user.email = '';
        this.loginMenu = true;
    } else {
      this.user.status = true;
      this.user.email = data.email;
      this.loginMenu = false;
    }
    } );
  }


  logout() {
    localStorage.clear();
    this.user.status = false;
    this.user.email = '';
    this.loginMenu = true;
  }

}
