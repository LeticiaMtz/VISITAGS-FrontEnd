import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertDetailsComponent } from './alert-details/alert-details.component';
import { MyFollowUpComponent } from './my-follow-up/my-follow-up.component';
import { GeneralFollowComponent } from './general-follow/general-follow.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AuthGuard } from '../auth.guard';





const pagesRoutes: Routes = [
    { path: '', component: PagesComponent, children: [
        { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
        { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard] },
        { path: 'alertDetails', component: AlertDetailsComponent, canActivate: [AuthGuard] },
        { path: 'MyFollow', component: MyFollowUpComponent, canActivate: [AuthGuard] },
        { path: 'GeneralFollow', component: GeneralFollowComponent, canActivate: [AuthGuard] },
        { path: 'account', component: UserSettingsComponent, canActivate: [AuthGuard] },
        { path: '', redirectTo: '/home', pathMatch: 'full' }
        
    ]}
];

  

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
