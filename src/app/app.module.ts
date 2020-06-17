import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

//Rutas
import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatIconModule } from  '@angular/material/icon';
import { MatSidenavModule } from  '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { MatListModule } from  '@angular/material/list';
import { MatButtonModule } from  '@angular/material/button';
import {MatInputModule} from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { HomeComponent } from './pages/home/home.component';
import { AlertsComponent } from './pages/alerts/alerts.component';
import { MyFollowUpComponent } from './pages/my-follow-up/my-follow-up.component';
import { GeneralFollowComponent } from './pages/general-follow/general-follow.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AlertDetailsComponent } from './pages/alert-details/alert-details.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PagesComponent } from './pages/pages.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NoPageFoundComponent,
    HeaderComponent,
    SidebarComponent, 
    BreadcrumbsComponent, 
    PagesComponent,
    HomeComponent,
    AlertsComponent,
    MyFollowUpComponent,
    GeneralFollowComponent,
    UserSettingsComponent,
    AlertDetailsComponent, 
    MainComponent

  ],
  imports: [
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
