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
    basicData: any;
    countCall: number = 0;
    openGraph : boolean = false;

    basicOptions: any;

    isActive: boolean = true;

    totalActiveDdo: number = 0;
    totalInActiveDdo: number = 0;

    totalActiveDetailHead: number = 0;
    totalInActiveDetailHead: number = 0;

    totalActiveSubDetailHead: number = 0;
    totalInActiveSubDetailHead: number = 0;

    totalActiveDepartment: number = 0;
    totalInActiveDepartment: number = 0;

    totalActiveMajorHead: number = 0;
    totalInActiveMajorHead: number = 0;

    totalActiveSchemeHead: number = 0;
    totalInActiveSchemeHead: number = 0;

    totalActiveMinorHead: number = 0;
    totalInActiveMinorHead: number = 0;

    totalActiveSubMajorHead: number = 0;
    totalInActiveSubMajorHead: number = 0;

    totalActiveTreasury: number = 0;
    totalInActiveTreasury: number = 0;




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
        // this.basicData = {
        //     labels: ['DDO', 'DETAIL HEAD', 'SUB DETAIL HEAD', 'DEPARTMENT', 'MAJOR HEAD', 'MINOR HEAD', 'SCHEME HEAD', 'TREASURY', 'SUB MAJOR HEAD'],
        //     datasets: [
        //         {
        //             label: 'Active',
        //             backgroundColor: '#42A5F5',
        //             data: [this.totalActiveDdo, this.totalActiveDetailHead, this.totalActiveSubDetailHead, this.totalActiveDepartment, this.totalActiveMajorHead, this.totalActiveMinorHead, this.totalActiveSchemeHead, this.totalActiveTreasury, this.totalActiveSubMajorHead]
        //         },
        //         {
        //             label: 'Inactive',
        //             backgroundColor: '#FFA726',
        //             data: [this.totalInActiveDdo, this.totalInActiveDetailHead, this.totalInActiveSubDetailHead, this.totalInActiveDepartment, this.totalInActiveMajorHead, this.totalInActiveMinorHead, this.totalInActiveSchemeHead, this.totalInActiveTreasury, this.totalInActiveSubMajorHead]
        //         }
        //     ]
        // };
    }
    
    showGraph(){
        this.openGraph = true;
        console.log(this.countCall);
        if(this.countCall == 12){
            debugger;
            this.basicData = {
                labels: ['DDO', 'DETAIL HEAD', 'SUB DETAIL HEAD', 'DEPARTMENT', 'MAJOR HEAD', 'MINOR HEAD', 'SCHEME HEAD', 'TREASURY', 'SUB MAJOR HEAD'],
                datasets: [
                    {
                        label: 'Active',
                        backgroundColor: '#42A5F5',
                        data: [this.totalActiveDdo, this.totalActiveDetailHead, this.totalActiveSubDetailHead, this.totalActiveDepartment, this.totalActiveMajorHead, this.totalActiveMinorHead, this.totalActiveSchemeHead, this.totalActiveTreasury, this.totalActiveSubMajorHead]
                    },
                    {
                        label: 'Inactive',
                        backgroundColor: '#FFA726',
                        data: [this.totalInActiveDdo, this.totalInActiveDetailHead, this.totalInActiveSubDetailHead, this.totalInActiveDepartment, this.totalInActiveMajorHead, this.totalInActiveMinorHead, this.totalInActiveSchemeHead, this.totalInActiveTreasury, this.totalInActiveSubMajorHead]
                    }
                ]
            };
            
        }
    }

    getActiveandInActiveCount(isActive: boolean) {
        this.getMasterDdoCount(isActive);
        this.getMasterDetailHeadCount(isActive);
        this.getMasterSubDetailHeadCount(isActive);
        this.getMasterDepartmentCount(isActive);
        this.getMasterMajorHeadCount(isActive);
        this.getMasterSchemeHeadCount(isActive);
    }


    // masterDdoService = inject(MasterService);
    getMasterDdoCount(isActive: boolean) {
        if (isActive == true) {
            this.masterDdoService.countMasterDdo(isActive, this.tableQueryParameters).subscribe((response: any) => {
                this.totalActiveDdo = response;
                this.countCall = this.countCall + 1;
            });
        }
        else if (isActive == false) {
            this.masterDdoService.countMasterDdo(isActive, this.tableQueryParameters).subscribe((response: any) => {
                this.totalInActiveDdo = response;
                this.countCall = this.countCall + 1;
            });
        }

    }
    getMasterDetailHeadCount(isActive: boolean) {
        if (isActive == true) {
            this.detailHeadService.countMasterDetailHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
                this.totalActiveDetailHead = response;
                this.countCall = this.countCall + 1;
            });
        }
        else if (isActive == false) {
            this.detailHeadService.countMasterDetailHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
                this.totalInActiveDetailHead = response;
                this.countCall = this.countCall + 1;
            });
        }
    }
    getMasterSubDetailHeadCount(isActive: boolean) {
        if (isActive == true) {
            this.subDetailHeadService.countMasterSubDetailHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
                this.totalActiveSubDetailHead = response;
                this.countCall = this.countCall + 1;
            });
        }
        else if (isActive == false) {
            this.subDetailHeadService.countMasterSubDetailHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
                this.totalInActiveSubDetailHead = response;
                this.countCall = this.countCall + 1;
            });
        }
    }
    getMasterMajorHeadCount(isActive: boolean) {
        if (isActive == true) {
            this.majorHeadService.countMasterMajorHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
                this.totalActiveMajorHead = response;
                this.countCall = this.countCall + 1;
            });
        }
        else if (isActive == false) {
            this.majorHeadService.countMasterMajorHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
                this.totalInActiveMajorHead = response;
                this.countCall = this.countCall + 1;
            });
        }

    }
    getMasterSchemeHeadCount(isActive: boolean) {
        if (isActive == true) {
            this.schemeHeadService.countMasterSchemeHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
                this.totalActiveSchemeHead = response;
                this.countCall = this.countCall + 1;
            });
        }
        else if (isActive == false) {
            this.schemeHeadService.countMasterSchemeHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
                this.totalInActiveSchemeHead = response;
                this.countCall = this.countCall + 1;
            });
        }

    }
    getMasterDepartmentCount(isActive: boolean) {
        if (isActive == true) {
            this.deparmentService.countMasterDepartment(isActive, this.tableQueryParameters).subscribe((response: any) => {
                this.totalActiveDepartment = response;
                this.countCall = this.countCall + 1;
            });
        }
        else if (isActive == false) {
            this.deparmentService.countMasterDepartment(isActive, this.tableQueryParameters).subscribe((response: any) => {
                this.totalInActiveDepartment = response;
                this.countCall = this.countCall + 1;
            });
        }
        // this.showGraph();
    }

}
