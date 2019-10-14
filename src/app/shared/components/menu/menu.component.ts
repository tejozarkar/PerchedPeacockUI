import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../service/cookie.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public showMenu = false;

  public isAdmin = false;

  constructor(private readonly cookieService: CookieService) { }

  ngOnInit() {
    if(parseInt(this.cookieService.getCookie('userType'))===1){
      this.isAdmin = true;
    }
  }

  onMenuIconClick():void{
    this.showMenu = !this.showMenu;
  }

}
