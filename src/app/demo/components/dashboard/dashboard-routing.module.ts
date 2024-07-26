import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {CardModule} from 'primeng/card';
import { DashboardskeletonComponent } from '../dashboardskeleton/dashboardskeleton.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path:'dashboardSkeleton', component:DashboardskeletonComponent}
    ])],
    exports: [RouterModule,CardModule]
})
export class DashboardsRoutingModule { }
