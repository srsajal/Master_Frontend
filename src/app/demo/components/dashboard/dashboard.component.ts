import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/MasterService/masterddo.service';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { DetailheadService } from '../../service/MasterService/detailhead.service';
import { SubdetailheadService } from '../../service/MasterService/subdetailhead.service';
import { DepartmentServiceService } from '../../service/MasterService/department-service.service';
import { MastermajorheadService } from '../../service/MasterService/mastermajorhead.service';
import { SchemeHeadServiceService } from '../../service/MasterService/master-schemehead.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    isActive: boolean = true;

    totalDdo: number = 0;
    totalActiveDdo: number = 0;
    totalInActiveDdo: number = 0;

    totalDetailHead: number = 0;
    totalActiveDetailHead: number = 0;
    totalInActiveDetailHead: number = 0;

    totalSubDetailHead: number = 0;
    totalActiveSubDetailHead: number = 0;
    totalInActiveSubDetailHead: number = 0;

    totalDepartment: number = 0;
    totalActiveDepartment: number = 0;
    totalInActiveDepartment: number = 0;

    totalMajorHead: number = 0;
    totalActiveMajorHead: number = 0;
    totalInActiveMajorHead: number = 0;

    totalSchemeHead: number = 0;
    totalActiveSchemeHead: number = 0;
    totalInActiveSchemeHead: number = 0;



    tableQueryParameters !: DynamicTableQueryParameters | any;
    /**
     *
     */
    constructor(private masterDdoService: MasterService, private detailHeadService: DetailheadService, private subDetailHeadService: SubdetailheadService, private deparmentService: DepartmentServiceService, private majorHeadService: MastermajorheadService, private schemeHeadService: SchemeHeadServiceService,) {

    }
    ngOnInit(): void {
        this.tableQueryParameters = {
            pageSize: 10,
            pageIndex: 0,
            filterParameters: [],
        };
        this.getActiveandInActiveCount(true);
        this.getActiveandInActiveCount(false);
        this.totalDdo = this.totalActiveDdo + this.totalInActiveDdo
        this.totalDetailHead = this.totalActiveDetailHead + this.totalInActiveDetailHead
        this.totalSubDetailHead = this.totalActiveSubDetailHead + this.totalInActiveSubDetailHead
        this.totalDepartment = this.totalActiveDepartment + this.totalInActiveDepartment
        this.totalMajorHead = this.totalActiveMajorHead + this.totalInActiveMajorHead
        this.totalSchemeHead = this.totalActiveSchemeHead + this.totalInActiveSchemeHead

    }
    getActiveandInActiveCount(isActive: boolean) {
        if (isActive == true) {
            this.totalActiveDdo = this.getMasterDdoCount(isActive);
            this.totalActiveDetailHead = this.getMasterDetailHeadCount(isActive);
            this.totalActiveSubDetailHead = this.getMasterSubDetailHeadCount(isActive);
            this.totalActiveDepartment = this.getMasterDepartmentCount(isActive);
            this.totalActiveMajorHead = this.getMasterMajorHeadCount(isActive);
            this.totalActiveSchemeHead = this.getMasterSchemeHeadCount(isActive);
        }
        else if (isActive == false) {
            this.totalInActiveDetailHead = this.getMasterDetailHeadCount(isActive);
            this.totalInActiveDdo = this.getMasterDdoCount(isActive);
            this.totalInActiveSubDetailHead = this.getMasterSubDetailHeadCount(isActive);
            this.totalInActiveDepartment = this.getMasterDepartmentCount(isActive);
            this.totalInActiveMajorHead = this.getMasterMajorHeadCount(isActive);
            this.totalInActiveSchemeHead = this.getMasterSchemeHeadCount(isActive);
        }
    }


    // masterDdoService = inject(MasterService);
    getMasterDdoCount(isActive: boolean): any {
        this.masterDdoService.countMasterDdo(isActive, this.tableQueryParameters).subscribe((response: any) => {
            return response;
        });
    }
    getMasterDetailHeadCount(isActive: boolean): any {
        this.detailHeadService.countMasterDetailHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
            return response;
        });
    }
    getMasterSubDetailHeadCount(isActive: boolean): any {
        this.subDetailHeadService.countMasterSubDetailHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
            return response;
        });
    }
    getMasterMajorHeadCount(isActive: boolean): any {
        this.deparmentService.countMasterDepartment(isActive, this.tableQueryParameters).subscribe((response: any) => {
            return response;
        });
    }
    getMasterSchemeHeadCount(isActive: boolean): any {
        this.schemeHeadService.countMasterSchemeHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
            return response;
        });
    }
    getMasterDepartmentCount(isActive: boolean): any {
        this.majorHeadService.countMasterMajorHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
            return response;
        });
    }

}
