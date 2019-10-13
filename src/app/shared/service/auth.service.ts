import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  public login(user: User) {
    return this.http.post('http://localhost:8080/authenticate', user, { headers: { skip: "true" } });
  }

  public register(user: User) {
    return this.http.post('http://localhost:8080/register', user, { headers: { skip: "true" } });
  }

}
