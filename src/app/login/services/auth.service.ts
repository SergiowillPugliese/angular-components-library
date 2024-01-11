import { Injectable } from '@angular/core';
import { AuthRequest, AuthResponse, ChangePasswordRequest, ChangePasswordResponse, User } from '../interface/auth.interface';
import { ApiService } from './api.service';
import { BehaviorSubject, tap, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly SUITE_TOKEN = 'SUITE_TOKEN';
  private readonly SUITE_USER = 'SUITE_USER';
  private _authenticatedUser: BehaviorSubject<any> = new BehaviorSubject(null);

  public get authenticatedUser(): Observable<string> {
    return this._authenticatedUser.asObservable();
  }

  constructor(private apiService: ApiService) {
    const user = this.getUser();
    user && this._authenticatedUser.next(user);
  }


  login(value: AuthRequest) {
    return this.apiService.post<AuthRequest, AuthResponse>("auth/login", value).pipe(tap(res => {
      this.setUser(value.email);
      this.setToken(res.token);
      this._authenticatedUser.next(value.email);
    }))
  }

  changePassword(value: ChangePasswordRequest) {
    return this.apiService.put<ChangePasswordRequest, ChangePasswordResponse>("user/changePassword", value);
  }

  getUserFromToken() {
    return this.apiService.get<User>("user");
  }

  setUser(email: string) {
    sessionStorage.setItem(this.SUITE_USER, email);
  }

  getUser() {
    return sessionStorage.getItem(this.SUITE_USER);
  }

  getAuthUserValue() {
    return this._authenticatedUser.getValue();
  }

  setToken(token: string) {
    sessionStorage.setItem(this.SUITE_TOKEN, token);
  }

  getToken() {
    return sessionStorage.getItem(this.SUITE_TOKEN);
  }


  logout() {
    sessionStorage.removeItem(this.SUITE_TOKEN);
    sessionStorage.removeItem(this.SUITE_USER);
    this._authenticatedUser.next(null);
  }


}
