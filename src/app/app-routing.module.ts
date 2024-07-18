import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppLayoutComponent } from "./layout/app.layout.component";
import { MasterddoComponent } from './demo/components/masterddo/masterddo.component';
import { MajorheadComponent } from './demo/components/majorhead/majorhead.component';
import { SchemeheadComponent } from './demo/components/schemehead/schemehead.component';
import { DepartmentComponent } from './demo/components/department/department.component';
import { TreasuryComponent } from './demo/components/treasury/treasury.component';
import { MasterdetailheadComponent } from './demo/components/masterdetailhead/masterdetailhead.component';
import { MastersubdetailheadComponent } from './demo/components/mastersubdetailhead/mastersubdetailhead.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path:'masterDDO', component:MasterddoComponent},
                    { path:'detailHead', component:MasterdetailheadComponent},
                    { path:'subDetailHead', component:MastersubdetailheadComponent},
                    { path:'majorHead', component:MajorheadComponent},
                    { path:'schemeHead', component:SchemeheadComponent},
                    { path:'department', component:DepartmentComponent},
                    { path:'treasury', component:TreasuryComponent}
                ]
            },
           
           
            
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
