import { Component, inject, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Code, MasterDdo, MasterDetailHead } from 'src/Model/master.model';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MasterdetailheadformComponent } from '../masterForms/masterdetailheadform/masterdetailheadform.component';
import { DetailheadService } from '../../service/MasterService/detailhead.service';

@Component({
  selector: 'app-masterdetailhead',
  templateUrl: './masterdetailhead.component.html',
  styleUrls: ['./masterdetailhead.component.scss']
})
export class MasterdetailheadComponent implements OnInit {
  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  alldata: number = 0;
  visible: boolean = false;
  id: number = 0;
  codes: Code[] = [];
  dialogButts: number = 1;
  istableLoading:boolean = false;
  totalActiveDetailHead:number=0
  totalInactiveDetailHead:number=0
  items: MenuItem[];
  home: MenuItem;
  
  messageService = inject(MessageService);
  detailHeadService = inject(DetailheadService);
  confirmationService = inject(ConfirmationService);

  ref: DynamicDialogRef | undefined;
  constructor(public dialogService: DialogService, public config : DynamicDialogConfig) {
    this.items = [
      { label: 'Master Management' },
      { label: 'Detail Head' },
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
   }
  show() {
    this.ref = this.dialogService.open(MasterdetailheadformComponent, {
      data:{
        dialogButt : 1,
        code : this.codes,
        isDisable : false,
        pgetData : this.showNormalData.bind(this),

      },
      width: '50rem',
      modal:true,
      header: 'ADD DETAIL HEAD DATA' 
    });
  }

  ngOnInit(): void {
    this.tableInitialize();
    this.getData();
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
  getData(isActive:boolean = true) {
    this.istableLoading = true;
    this.detailHeadService.getMasterDetailHead(isActive, this.tableQueryParameters).subscribe((response: any) => {
      this.istableLoading =false;
      this.tableData = response.result;
      this.alldata = response.result.dataCount;
    });
  }
  editData(tmpid: number) {
    this.ref = this.dialogService.open(MasterdetailheadformComponent, {
      data:{
        dialogButt : 2,
        code : this.codes,
        id : tmpid,
        isDisable : false,
        pgetData : this.showNormalData.bind(this),

      },
      width: '50rem',
      modal:true,
      header: 'EDIT DETAIL HEAD DATA' 
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

  getDataCount(){
    this.detailHeadService.countMasterDetailHead(true,this.tableQueryParameters).subscribe((res:any)=> {
      this.totalActiveDetailHead = res;
    });
    this.detailHeadService.countMasterDetailHead(false,this.tableQueryParameters).subscribe((res:any)=> {
      this.totalInactiveDetailHead = res;
    });
  }

  delData(tmpid: number) {
    this.detailHeadService.deleteMasterDetailHeadById(tmpid).subscribe(() => {
      this.getData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 2000 });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete Master Detail Head record', life: 2000 });
      }
    );
  }

  restoreData(tmpid: number) {
    this.detailHeadService.restoreMasterDetailHeadById(tmpid).subscribe(() => {
      this.showDeletedData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record restored', life: 2000 });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to restore Master Detail Head record', life: 2000 });
      }
    );
  }

  viewData(tmpid : number){
    this.detailHeadService.getMasterDetailHeadById(tmpid).subscribe((res: MasterDetailHead) => {
      this.ref = this.dialogService.open(MasterdetailheadformComponent, {
        data:{
          dialogButt : 3,
          code : this.codes,
          id : tmpid,
          isDisable : true,
        },
        width: '50rem',
        modal:true,
        header: 'VIEW DETAIL HEAD DATA' 
      });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch Master Detail Head data by ID', life: 2000 });
      }
    );
  }

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
