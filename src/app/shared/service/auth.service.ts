import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  public login(user: User) {
    return this.http.post(environment.apiUrl+'/authenticate', user, { headers: { skip: "true" } });
  }

  public register(user: User) {
    return this.http.post(environment.apiUrl+'/register', user, { headers: { skip: "true" } });
  }

}
