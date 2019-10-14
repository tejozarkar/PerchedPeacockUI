import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../service/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public showMenu = false;

  public isAdmin = false;

  constructor(
    private readonly router: Router,
    private readonly cookieService: CookieService) { }

  ngOnInit() {
    if (parseInt(this.cookieService.getCookie('userType')) === 1) {
      this.isAdmin = true;
    }
  }

  public onMenuIconClick(): void {
    this.showMenu = !this.showMenu;
  }

  public logout() {
    this.cookieService.setCookie('authorization', null, 0);
    this.router.navigate(['/auth/login']);
  }

}
