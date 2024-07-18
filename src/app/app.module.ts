import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';

import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { MasterddoComponent } from './demo/components/masterddo/masterddo.component';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import { MhPrimeDynamicTableModule } from 'mh-prime-dynamic-table';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MajorheadComponent } from './demo/components/majorhead/majorhead.component';
import { SchemeheadComponent } from './demo/components/schemehead/schemehead.component';
import { DepartmentComponent } from './demo/components/department/department.component';
import { TreasuryComponent } from './demo/components/treasury/treasury.component';
import { DropdownModule } from 'primeng/dropdown';
import {DialogService, DynamicDialogConfig, DynamicDialogModule} from 'primeng/dynamicdialog';
import { MasterddoformsComponent } from './demo/components/masterForms/masterddoforms/masterddoforms.component';
import { MasterdetailheadComponent } from './demo/components/masterdetailhead/masterdetailhead.component';
import { MastersubdetailheadComponent } from './demo/components/mastersubdetailhead/mastersubdetailhead.component';
import { MasterdetailheadformComponent } from './demo/components/masterForms/masterdetailheadform/masterdetailheadform.component';
import { MastersubdetailheadformComponent } from './demo/components/masterForms/mastersubdetailheadform/mastersubdetailheadform.component';



@NgModule({
    declarations: [
        AppComponent,
        MasterddoComponent,
        MajorheadComponent,
        SchemeheadComponent,
        DepartmentComponent,
        TreasuryComponent,
        MasterddoformsComponent,
        MasterdetailheadComponent,
        MastersubdetailheadComponent,
        MasterdetailheadformComponent,
        MastersubdetailheadformComponent,    
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        ReactiveFormsModule,
        MessagesModule,
        ToastModule,
        MhPrimeDynamicTableModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DropdownModule,
        DynamicDialogModule,      
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, BrowserAnimationsModule, MessageService, HttpClient, DialogService, DynamicDialogConfig
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
