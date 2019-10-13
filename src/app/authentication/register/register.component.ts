import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
import { User } from '../../shared/model/User';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public user = new User;

  constructor(private readonly authService: AuthService,
    private readonly snackbar: SnackbarService,
    private readonly router: Router) { }

  public register(form: NgForm): void {
    if(form.controls['password'].value !== form.controls['repeat-password'].value){
      this.snackbar.show('Passwords do not match','danger');
      return;
    }
    if(form.valid){
      this.authService.register(this.user).subscribe(resp => {
        this.snackbar.show('Registered successful');
        this.router.navigate(['auth/login']);
      }, err => this.snackbar.show('err.message', 'danger'));
    }
  }

}
