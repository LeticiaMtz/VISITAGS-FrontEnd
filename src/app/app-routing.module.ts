import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { AlertDetailsComponent } from './pages/alert-details/alert-details.component';
import { AlertsComponent } from './pages/alerts/alerts.component';
import { MyFollowUpComponent } from './pages/my-follow-up/my-follow-up.component';
import { GeneralFollowComponent } from './pages/general-follow/general-follow.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
{ path: '', component: PagesComponent, children: [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard] },
  { path: 'alertDetails', component: AlertDetailsComponent, canActivate: [AuthGuard] },
  { path: 'MyFollow', component: MyFollowUpComponent, canActivate: [AuthGuard] },
  { path: 'GeneralFollow', component: GeneralFollowComponent, canActivate: [AuthGuard] },
  { path: 'account', component: UserSettingsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  ]},
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: '**', component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot( routes, { useHash: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
