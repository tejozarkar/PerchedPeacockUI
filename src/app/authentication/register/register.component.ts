import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
import { User } from '../../shared/model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user = new User;

  constructor(private readonly authService: AuthService) { }

  ngOnInit() {
  }
  
  public register(){
    this.authService.register(this.user).subscribe(resp=>{
      console.log(resp);
    });
  }

}
