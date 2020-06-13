import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatIconModule } from  '@angular/material/icon';
import { MatSidenavModule } from  '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { MatListModule } from  '@angular/material/list';
import { MatButtonModule } from  '@angular/material/button';
import {MatInputModule} from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { HomeComponent } from './components/home/home.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { MyFollowUpComponent } from './components/my-follow-up/my-follow-up.component';
import { GeneralFollowComponent } from './components/general-follow/general-follow.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AlertDetailsComponent } from './components/alert-details/alert-details.component';


const appRoutes: Routes = [
  //Roting loggin with another pages
  { path: '', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  {path: 'main', component: MainComponent,
  children: [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard] },
    { path: 'alertDetails', component: AlertDetailsComponent, canActivate: [AuthGuard] },
    { path: 'MyFollow', component: MyFollowUpComponent, canActivate: [AuthGuard] },
    { path: 'GeneralFollow', component: GeneralFollowComponent, canActivate: [AuthGuard] },
    {path: 'account', component: UserSettingsComponent, canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    AlertsComponent,
    MyFollowUpComponent,
    GeneralFollowComponent,
    AlertDetailsComponent,
    MainComponent,
    LoginComponent,
    UserSettingsComponent,
    AlertDetailsComponent


  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    Ng2SearchPipeModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
