import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/MasterService/masterddo.service';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { AllMasterCount } from 'src/Model/master.model';
import { Router } from '@angular/router';


@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    // basicData: any;

    ddoData: any;
    detailHeadData: any;
    subDetailHeadData: any;
    departmentData: any;
    majorHeadData: any;
    schemeHeadData: any;
    minorHeadData: any;
    subMajorHeadData: any;
    treasuryData: any;
    allMasterData!: AllMasterCount;
    countCall: number = 0;
    openGraph: boolean = false;

    basicOptions: any;

    isActive: boolean = true;

    isLoading: boolean = false;

    tableQueryParameters!: DynamicTableQueryParameters | any;
    /**
     *
     */
    constructor(private masterDdoService: MasterService, private router: Router) { }
    ngOnInit(): void {
        this.getAllMasterCount();
    }

    getAllMasterCount() {
        this.isLoading = true;
        this.masterDdoService.countAllMaster().subscribe((res: AllMasterCount) => {
            this.allMasterData = res;
            this.showGraph();
            this.isLoading = false;

        });
    }

    showGraph() {
        // this.basicData = {
        //     labels: ['DDO', 'DETAIL HEAD', 'SUB DETAIL HEAD', 'DEPARTMENT', 'MAJOR HEAD', 'MINOR HEAD', 'SCHEME HEAD', 'TREASURY', 'SUB MAJOR HEAD'],
        //     datasets: [
        //         {
        //             label: 'Active',
        //             backgroundColor: '#42A5F5',
        //             data: [this.allMasterData.totalActiveDdo, this.allMasterData.totalActiveDetailHead, this.allMasterData.totalActiveSubDetailHead, this.allMasterData.totalActiveDepartment, this.allMasterData.totalActiveMajorHead, this.allMasterData.totalActiveMinorHead, this.allMasterData.totalActiveSchemeHead, this.allMasterData.totalActiveTreasury, this.allMasterData.totalActiveSubMajorHead],
        //             hoverBackgroundColor: [
        //                 "#64B5F6",
        //                 "#81C784",
        //                 "#FFB74D"
        //             ]
        //         },
        //         {
        //             label: 'Inactive',
        //             backgroundColor: '#FFA726',
        //             data: [this.allMasterData.totalInactiveDdo, this.allMasterData.totalInactiveDetailHead, this.allMasterData.totalInactiveSubDetailHead, this.allMasterData.totalInactiveDepartment, this.allMasterData.totalInactiveMajorHead, this.allMasterData.totalInactiveMinorHead, this.allMasterData.totalInactiveSchemeHead, this.allMasterData.totalInactiveTreasury, this.allMasterData.totalInactiveSubMajorHead],
        //             hoverBackgroundColor: [
        //                 "#64B5F6",
        //                 "#81C784",
        //                 "#FFB74D"
        //             ]
        //         }
        //     ]
        // };

        this.ddoData = {
            labels: ['DDO'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.allMasterData.totalActiveDdo]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.allMasterData.totalInactiveDdo]
                }
            ]
        }
        this.detailHeadData = {
            labels: ['DETAIL HEAD'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.allMasterData.totalActiveDetailHead]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.allMasterData.totalInactiveDetailHead]
                }
            ]
        };

        this.subDetailHeadData = {
            labels: ['SUB DETAIL HEAD'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.allMasterData.totalActiveSubDetailHead]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.allMasterData.totalInactiveSubDetailHead]
                }
            ]
        };

        this.departmentData = {
            labels: ['DEPARTMENT'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.allMasterData.totalActiveDepartment]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.allMasterData.totalInactiveDepartment]
                }
            ]
        };

        this.majorHeadData = {
            labels: ['MAJOR HEAD'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.allMasterData.totalActiveMajorHead]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.allMasterData.totalInactiveMajorHead]
                }
            ]
        };

        this.minorHeadData = {
            labels: ['MINOR HEAD'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.allMasterData.totalActiveMinorHead]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.allMasterData.totalInactiveMinorHead]
                }
            ]
        };

        this.schemeHeadData = {
            labels: ['SCHEME HEAD'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.allMasterData.totalActiveSchemeHead]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.allMasterData.totalInactiveSchemeHead]
                }
            ]
        };

        this.treasuryData = {
            labels: ['TREASURY'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.allMasterData.totalActiveTreasury]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.allMasterData.totalInactiveTreasury]
                }
            ]
        };

        this.subMajorHeadData = {
            labels: ['SUB MAJOR HEAD'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.allMasterData.totalActiveSubMajorHead]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.allMasterData.totalInactiveSubMajorHead]
                }
            ]
        };


    }


}
