import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private AuthService: AuthService, private Router:Router) { }

  canActivate( //Pregunta si se puede mandar a llamar, independientemente de si fue cargado antes o no
              //El canLoad sirve para ni siquierea cargarlo desde el inicio, el canActivate por si de todos modos ya se cargó

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      return this.AuthService.verificaAuth()
      .pipe(
        tap( estaAuth => {
          if(!estaAuth){
            this.Router.navigate(["./auth/login"]);
          }
        })
      );
    // return true;
    // if (this.AuthService.auth.id) {
    //   return true;
    // }
    // console.log("Bloqueado por el auth.Guard canActivate")
    // return false;
  }

  canLoad( //Pregunta si puede cargar el módulo, si ya se había cargado va a poder acceder a él de todos modos
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    
    return this.AuthService.verificaAuth().pipe(
      tap( estaAuth => {
        if(!estaAuth){
          this.Router.navigate(["./auth/login"]);
        }
      })
    );
  }
}
