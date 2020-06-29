import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { PAGES_ROUTES } from './pages.routes';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { CareerReportComponent } from './career-report/career-report.component';
import { RegisterCareerComponent } from './career-report/register-career/register-career.component';
import { UpdateCareerComponent } from './career-report/update-career/update-career.component';
import { CommonModule } from '@angular/common';
import { SpecialtyReportComponent } from './specialty-report/specialty-report.component';
import { RegisterSpecialtyComponent } from './specialty-report/register-specialty/register-specialty.component';
import { UpdateSpecialtyComponent } from './specialty-report/update-specialty/update-specialty.component';





@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficaDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        CareerReportComponent,
        RegisterCareerComponent,
        UpdateCareerComponent,
        SpecialtyReportComponent,
        RegisterSpecialtyComponent,
        UpdateSpecialtyComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        CommonModule,
        Ng2SearchPipeModule,
        NgxPaginationModule
    ]
})

export class PagesModule { }
