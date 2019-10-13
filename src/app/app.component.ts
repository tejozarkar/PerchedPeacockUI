import { Component, OnInit } from '@angular/core';
import { CookieService } from './shared/service/cookie.service';
import { Router } from '@angular/router';
import { LoaderService } from './shared/service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PerchedPeacock';
  public showLoader = false;

  constructor(private readonly cookieService: CookieService,
    private readonly router: Router,
    private readonly loaderService: LoaderService) { }

  ngOnInit(): void {
    let AuthToken = this.cookieService.getCookie('authorization');
      if(AuthToken===''){
        this.router.navigate(['auth/login']);
    }
    this.loaderService.loaderState.subscribe(
      state => this.showLoader  = state.show
    );
    // if(AuthToken!==''){
    //   this.router.navigate(['home']);
    // }
  }
}
