import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';

//Alertas Academicas Pages
import { CareerReportComponent } from './career-report/career-report.component';

//AdminPro Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }, canActivate: [AuthGuard] },
          { path: 'career-report', component: CareerReportComponent, data: { titulo: 'Reporte de Carreas' }, canActivate: [AuthGuard] },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }, canActivate: [AuthGuard] },
          { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' }, canActivate: [AuthGuard] },
          { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }, canActivate: [AuthGuard] },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }, canActivate: [AuthGuard] },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' }, canActivate: [AuthGuard]},
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
