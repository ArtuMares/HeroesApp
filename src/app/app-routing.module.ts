import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [{
  path: "404",
  component: ErrorPageComponent
},{
  path:"auth",
  loadChildren:() => import("./auth/auth.module").then(m => m.AuthModule)  //Lazy load para el auth module(solo carga los módulos dependiendo de las rutas hijas)
},
{
  path:"heroes",
  loadChildren:() => import("./heroes/heroes.module").then(m => m.HeroesModule)  //Lazy load para el heroes module(solo carga los módulos dependiendo de las rutas hijas)
},
{
  path: "**",
  //component: ErrorPageComponent
  redirectTo: "404"
}]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]

})
export class AppRoutingModule { }
