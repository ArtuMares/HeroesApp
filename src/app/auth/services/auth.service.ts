import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, Observable, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _auth: Auth | undefined;

  get auth() {
    return { ...this._auth! }
  }
  constructor(private http: HttpClient) { }

  verificaAuth(): Observable<boolean> {
    if (!(localStorage.getItem("token"))) {
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(auth=> {
            this._auth=auth;
            return true; 
        })
      );
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(tap(auth => this._auth = auth), //Esto se manda a llamar antes que del lado del login porque esto se hace antes del .subscribe()
        tap(auth => localStorage.setItem("token", auth.id))
      );

  }
  logout() {
    this._auth = undefined;
    localStorage.removeItem("token");
  }
}
