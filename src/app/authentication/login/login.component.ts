import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
import { User } from '../../shared/model/User';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/shared/service/cookie.service';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = new User();

  constructor(private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly router: Router,
    private readonly snackbar: SnackbarService) { }

  ngOnInit(): void {

  }

  public login() {
    this.authService.login(this.user)
      .subscribe(resp => {
        this.snackbar.show('Login successful');
        if (resp.hasOwnProperty('token')) {
          this.cookieService.setCookie('authorization', resp['token'], 1);
          this.router.navigate(['home']);
        }
      },err=>{
        this.snackbar.show(err.message, 'danger');
      });
  }


}
