import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {CardModule} from 'primeng/card';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent }
    ])],
    exports: [RouterModule,CardModule]
})
export class DashboardsRoutingModule { }
