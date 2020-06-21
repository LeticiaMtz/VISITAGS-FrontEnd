import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts.component';
import { MyFollowUpComponent } from './my-follow-up/my-follow-up.component';
import { GeneralFollowComponent } from './general-follow/general-follow.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AlertDetailsComponent } from './alert-details/alert-details.component';






@NgModule({
    declarations: [
        PagesComponent,
        HomeComponent,
        AlertsComponent,
        MyFollowUpComponent,
        GeneralFollowComponent,
        UserSettingsComponent,
        AlertDetailsComponent, 
    ],
    exports: [
        PagesComponent,
        HomeComponent,
        AlertsComponent,
        MyFollowUpComponent,
        GeneralFollowComponent,
        UserSettingsComponent,
        AlertDetailsComponent, 
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule
        
    ]
})
export class PagesModule { }
