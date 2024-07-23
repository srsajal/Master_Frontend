import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/MasterService/masterddo.service';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { AllMasterCount } from 'src/Model/master.model';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    basicData: any;

    ddoData: any;
    detailHeadData: any;
    subDetailHeadData: any;
    departmentData: any;
    majorHeadData: any;
    schemeHeadData: any;
    minorHeadData: any;
    subMajorHeadData: any;
    treasuryData: any;

    countCall: number = 0;
    openGraph: boolean = false;

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

    tableQueryParameters!: DynamicTableQueryParameters | any;
    /**
     *
     */
    constructor(private masterDdoService: MasterService) { }
    ngOnInit(): void {
        this.getAllMasterCount();
    }

    getAllMasterCount() {
        this.masterDdoService.countAllMaster().subscribe((res: AllMasterCount) => {
            console.log(res);
            this.totalActiveDdo = res.totalActiveDdo;
            this.totalInActiveDdo = res.totalInactiveDdo;

            this.totalActiveDetailHead = res.totalActiveDetailHead;
            this.totalInActiveDetailHead = res.totalInactiveDetailHead;

            this.totalActiveSubDetailHead = res.totalActiveSubDetailHead;
            this.totalInActiveSubDetailHead = res.totalInactiveSubDetailHead;

            this.totalActiveDepartment = res.totalActiveDepartment;
            this.totalInActiveDepartment = res.totalInactiveDepartment;

            this.totalActiveMajorHead = res.totalActiveMajorHead;
            this.totalInActiveMajorHead = res.totalInactiveMajorHead;

            this.totalActiveSchemeHead = res.totalActiveSchemeHead;
            this.totalInActiveSchemeHead = res.totalInactiveSchemeHead;

            this.totalActiveMinorHead = res.totalActiveMinorHead;
            this.totalInActiveMinorHead = res.totalInactiveMinorHead;

            this.totalActiveSubMajorHead = res.totalActiveSubMajorHead;
            this.totalInActiveSubMajorHead = res.totalInactiveSubMajorHead;

            this.totalActiveTreasury = res.totalActiveTreasury;
            this.totalInActiveTreasury = res.totalInactiveTreasury;

            this.showGraph();
        });
    }

    showGraph() {
        this.basicData = {
            labels: ['DDO', 'DETAIL HEAD', 'SUB DETAIL HEAD', 'DEPARTMENT', 'MAJOR HEAD', 'MINOR HEAD', 'SCHEME HEAD', 'TREASURY', 'SUB MAJOR HEAD'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.totalActiveDdo, this.totalActiveDetailHead, this.totalActiveSubDetailHead, this.totalActiveDepartment, this.totalActiveMajorHead, this.totalActiveMinorHead, this.totalActiveSchemeHead, this.totalActiveTreasury, this.totalActiveSubMajorHead],
                    hoverBackgroundColor: [
                        "#64B5F6",
                        "#81C784",
                        "#FFB74D"
                    ]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.totalInActiveDdo, this.totalInActiveDetailHead, this.totalInActiveSubDetailHead, this.totalInActiveDepartment, this.totalInActiveMajorHead, this.totalInActiveMinorHead, this.totalInActiveSchemeHead, this.totalInActiveTreasury, this.totalInActiveSubMajorHead],
                    hoverBackgroundColor: [
                        "#64B5F6",
                        "#81C784",
                        "#FFB74D"
                    ]
                }
            ]
        };

        this.ddoData = {
            labels: ['DDO'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.totalActiveDdo]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.totalInActiveDdo]
                }
            ]
        }
        this.detailHeadData = {
            labels: ['DETAIL HEAD'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.totalActiveDetailHead]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.totalInActiveDetailHead]
                }
            ]
        };

        this.subDetailHeadData = {
            labels: ['SUB DETAIL HEAD'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.totalActiveSubDetailHead]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.totalInActiveSubDetailHead]
                }
            ]
        };

        this.departmentData = {
            labels: ['DEPARTMENT'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.totalActiveDepartment]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.totalInActiveDepartment]
                }
            ]
        };

        this.majorHeadData = {
            labels: ['MAJOR HEAD'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.totalActiveMajorHead]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.totalInActiveMajorHead]
                }
            ]
        };

        this.minorHeadData = {
            labels: ['MINOR HEAD'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.totalActiveMinorHead]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.totalInActiveMinorHead]
                }
            ]
        };

        this.schemeHeadData = {
            labels: ['SCHEME HEAD'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.totalActiveSchemeHead]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.totalInActiveSchemeHead]
                }
            ]
        };

        this.treasuryData = {
            labels: ['TREASURY'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.totalActiveTreasury]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.totalInActiveTreasury]
                }
            ]
        };

        this.subMajorHeadData = {
            labels: ['SUB MAJOR HEAD'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: '#42A5F5',
                    data: [this.totalActiveSubMajorHead]
                },
                {
                    label: 'Inactive',
                    backgroundColor: '#FFA726',
                    data: [this.totalInActiveSubMajorHead]
                }
            ]
        };


    }


}
