import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';

//Alertas Academicas Pages
import { CareerReportComponent } from './career-report/career-report.component';
import { SpecialtyReportComponent } from './specialty-report/specialty-report.component';

//AdminPro Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { StatusReportComponent } from './status-report/status-report.component';
import { SubjectsComponent } from './subjects/subjects.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }, canActivate: [AuthGuard] },
          { path: 'career-report', component: CareerReportComponent, data: { titulo: 'Reporte de Carreas' }, canActivate: [AuthGuard] },
          { path: 'specialty-report/:id', component: SpecialtyReportComponent, data: { titulo: 'Reporte de Especialiddes' }, canActivate: [AuthGuard] },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }, canActivate: [AuthGuard] },
          { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' }, canActivate: [AuthGuard] },
          { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }, canActivate: [AuthGuard] },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }, canActivate: [AuthGuard] },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' }, canActivate: [AuthGuard]},
          { path: 'estatus-alerta', component: StatusReportComponent, data: { titulo: 'Catalogo de Estatus de Alertas' }, canActivate: [AuthGuard] },
          { path: 'subjects', component: SubjectsComponent, data: { titulo: 'Asignaturas' }, canActivate: [AuthGuard]},
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
