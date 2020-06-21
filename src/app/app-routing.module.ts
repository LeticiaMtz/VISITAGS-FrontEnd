import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NoPageFoundComponent },
  
];


export const APP_ROUTE = RouterModule.forRoot(routes, { useHash: true } );

/*@NgModule({
  imports: [RouterModule.forRoot( routes, { useHash: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/