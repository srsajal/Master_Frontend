import { Component, inject, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MastersubdetailheadformComponent } from '../masterForms/mastersubdetailheadform/mastersubdetailheadform.component';
import { MasterDetailHead, MasterSubDetailHead } from 'src/Model/master.model';
import { SubdetailheadService } from '../../service/MasterService/subdetailhead.service';

@Component({
  selector: 'app-mastersubdetailhead',
  templateUrl: './mastersubdetailhead.component.html',
  styleUrls: ['./mastersubdetailhead.component.scss']
})
export class MastersubdetailheadComponent implements OnInit {
  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  alldata: number = 0;
  visible: boolean = false;
  id: number = 0;
  codes: MasterDetailHead[] = [];
  dialogButts: number = 1;
  istableLoading:boolean = false;
  totalActiveSubDetailHead :number = 0;
  totalInactiveSubDetailHead :number = 0;
  items: MenuItem[];
  home: MenuItem;
  
  messageService = inject(MessageService);
  subDetailHeadService = inject(SubdetailheadService);
  confirmationService = inject(ConfirmationService);

  ref: DynamicDialogRef | undefined;
  constructor(public dialogService: DialogService, public config : DynamicDialogConfig) {
    this.items = [
      { label: 'Master Management' },
      { label: 'Sub Detail Head' },
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
   }
  show() {
    this.ref = this.dialogService.open(MastersubdetailheadformComponent, {
      data:{
        dialogButt : 1,
        code : this.codes,
        isDisable : false,
        pgetData : this.showNormalData.bind(this),

      },
      width: '50rem',
      modal:true,
      header: 'ADD SUB DETAIL HEAD DATA',
      contentStyle: {
        'background-color': '#e0f7fa',
        'padding': '20px',
        'border-radius': '8px',
        'color': '#006064',
      }
    });
  }


  ngOnInit(): void {
    this.tableInitialize();
    this.getData();
    this.getGetCodeFromDetailHead();
    this.getDataCount();
  }

  tableInitialize() {
    this.actionButtonConfig = [
      {
        buttonIdentifier: 'view',
        class: 'p-button-rounded p-button-raised',
        icon: 'pi pi-eye',
        lable: 'View',
      },
      {
        buttonIdentifier: 'edit',
        class: 'p-button-warning p-button-rounded p-button-raised',
        icon: 'pi pi-file-edit',
        lable: 'Edit',
      },
      {
        buttonIdentifier: 'del',
        class: 'p-button-danger p-button-rounded p-button-raised',
        icon: 'pi pi-trash',
        lable: 'Delete',
      }
    ];
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
      filterParameters: [],
    };
  }
  getData(isActive : boolean = true) {
    this.istableLoading = true;
    this.subDetailHeadService.getMasterSubDetailHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
      this.istableLoading = false;
      this.tableData = response.result;
      this.alldata = response.result.dataCount;
    });
  }
  getGetCodeFromDetailHead() {
    this.subDetailHeadService.getDetailHeadCode().subscribe((res: MasterDetailHead[]) => {
      this.codes = res;
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch codes from Detail Head', life: 2000 });
      }
    );
  }
  




  editData(tmpid: number) {
    this.ref = this.dialogService.open(MastersubdetailheadformComponent, {
      data:{
        dialogButt : 2,
        code : this.codes,
        id : tmpid,
        isDisable : false,
        pgetData : this.showNormalData.bind(this),

      },
      width: '50rem',
      modal:true,
      header: 'EDIT SUB DETAIL HEAD DATA',
      contentStyle: {
        'background-color': '#fff3e0', 
        'padding': '20px',
        'border-radius': '8px',
        'color': '#e65100',
      }
    });
  }

  confirmDelete(id : number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delData(id);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  delData(tmpid: number) {
    this.subDetailHeadService.deleteMasterSubDetailHeadById(tmpid).subscribe(() => {
      this.getData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 2000 });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete Master Sub Detail Head record', life: 2000 });
      }
    );
  }

  getDataCount(){
    this.subDetailHeadService.countMasterSubDetailHead(true,this.tableQueryParameters).subscribe((res:any)=> {
      this.totalActiveSubDetailHead = res;
    });
    this.subDetailHeadService.countMasterSubDetailHead(false,this.tableQueryParameters).subscribe((res:any)=> {
      this.totalInactiveSubDetailHead = res;
    });
  }

  restoreData(tmpid: number) {
    this.subDetailHeadService.restoreMasterSubDetailHeadById(tmpid).subscribe(() => {
      this.showDeletedData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record restored', life: 2000 });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to restore Master Sub Detail Head record', life: 2000 });
      }
    );
  }

  viewData(tmpid : number){
    this.subDetailHeadService.getMasterSubDetailHeadById(tmpid).subscribe((res: MasterSubDetailHead) => {
      this.ref = this.dialogService.open(MastersubdetailheadformComponent, {
        data:{
          dialogButt : 3,
          code : this.codes,
          id : tmpid,
          isDisable : true,
  
        },
        width: '50rem',
        modal:true,
        header: 'VIEW SUB DETAIL HEAD DATA',
        contentStyle: {
          'background-color': '#f3e5f5',
          'padding': '20px',
          'border-radius': '8px',
          'color': '#4a148c',
        }
      });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch Master Sub Detail Head data by ID', life: 2000 });
      }
    );
  }


  // showDialog() {
  // console.log("showdialog called");
  // this.visible = true;
  // this.userForm.reset();
  // this.userForm = this.initializeMasterForm(false);
  // console.log(this.userForm);
  // }

  showDeletedData(){
    this.actionButtonConfig = [
      {
        buttonIdentifier: 'view',
        class: 'p-button-rounded p-button-raised',
        icon: 'pi pi-eye',
        lable: 'View',
      },
      {
        buttonIdentifier: 'restore',
        class: 'p-button-warning p-button-rounded p-button-raised',
        icon: 'pi pi-undo',
        lable: 'Restore',
      },
    ];
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
      filterParameters: [],
    };
    this.getData(false);
  }
  showNormalData(){
    this.actionButtonConfig = [
      {
        buttonIdentifier: 'view',
        class: 'p-button-rounded p-button-raised',
        icon: 'pi pi-eye',
        lable: 'View',
      },
      {
        buttonIdentifier: 'edit',
        class: 'p-button-warning p-button-rounded p-button-raised',
        icon: 'pi pi-file-edit',
        lable: 'Edit',
      },
      {
        buttonIdentifier: 'del',
        class: 'p-button-danger p-button-rounded p-button-raised',
        icon: 'pi pi-trash',
        lable: 'Delete',
      }
    ];
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
      filterParameters: [],
    };
    this.getData();
  }

  handleRowSelection($event: any) {
    console.log("Download the details from above");
  }
  handleButtonClick(event: any) {
    if (event.buttonIdentifier == "edit") {
      this.editData(event.rowData.id);
    }
    else if (event.buttonIdentifier == "del") {
      this.confirmDelete(event.rowData.id);
    }
    else if (event.buttonIdentifier == "view") {
      this.viewData(event.rowData.id);
    }
    else if (event.buttonIdentifier == "restore") {
      this.restoreData(event.rowData.id);
    }
  }
  handQueryParameterChange(event: any) {
    this.tableQueryParameters = {
      pageSize: event.pageSize,
      pageIndex: event.pageIndex,
      filterParameters: event.filterParameters || [],
    };
    this.getData();
  }
  handleSearch(event: any) {
    console.log(event);
  }
  handleChange(event: any) {
    if (event.index === 0) {
      this.showNormalData();
    } else if (event.index === 1) {
      this.showDeletedData();
    }
  }

}
