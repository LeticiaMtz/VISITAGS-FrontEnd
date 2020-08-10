import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';

//Alertas Academicas Pages
import { CareerReportComponent } from './career-report/career-report.component';
import { SpecialtyReportComponent } from './specialty-report/specialty-report.component';
import { ReasonsCRDEComponent} from './reasons-crde/reasons-crde.component';


//AdminPro Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UpdateBehaviorComponent } from './behavior/update-behavior/update-behavior.component';
import { BehaviorComponent } from './behavior/behavior.component';


import { StatusReportComponent } from './status-report/status-report.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ModalityComponent } from './modality/modality.component';
import { AlertRegisterComponent } from './alert-register/alert-register.component';
import { TrackingAlertsComponent } from './tracking-alerts/tracking-alerts.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }, canActivate: [AuthGuard] },
          { path: 'career-report', component: CareerReportComponent, data: { titulo: 'Reporte de Carreras' }, canActivate: [AuthGuard] },
          { path: 'specialty-report/:id', component: SpecialtyReportComponent, data: { titulo: 'Reporte de Especialiddes' }, canActivate: [AuthGuard] },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }, canActivate: [AuthGuard] },
          { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' }, canActivate: [AuthGuard] },
          { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }, canActivate: [AuthGuard] },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }, canActivate: [AuthGuard] },
          { path: 'reasons-crde', component: ReasonsCRDEComponent, data: { titulo: 'Motivos CRDE' }, canActivate: [AuthGuard] },
          { path: 'behavior/:id', component: BehaviorComponent, data: { titulo: 'Condutas' }, canActivate: [AuthGuard] },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' }, canActivate: [AuthGuard]},
          { path: 'estatus-alerta', component: StatusReportComponent, data: { titulo: 'Catalogo de Estatus de Alertas' }, canActivate: [AuthGuard] },
          { path: 'registro-alerta', component: AlertRegisterComponent, data: { titulo: 'Registro de Alertas' }, canActivate: [AuthGuard] },
          { path: 'subjects', component: SubjectsComponent, data: { titulo: 'Asignaturas' }, canActivate: [AuthGuard]},
          { path: 'modality', component: ModalityComponent, data: { titulo: 'Modalidades' }, canActivate: [AuthGuard]},
          { path: 'Tracking-alerts/:id', component: TrackingAlertsComponent, data: { titulo: 'Seguimiento Alerta' }, canActivate: [AuthGuard]},
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
