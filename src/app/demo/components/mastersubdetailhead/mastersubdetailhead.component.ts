import { Component, inject, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DetailheadService } from '../../service/MasterService/detailhead.service';
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
  // apiUrl = 'http://localhost:5271/api/masterDDO/'
  visible: boolean = false;
  id: number = 0;
  codes: MasterDetailHead[] = [];
  // headertext: string = 'ADD DDO DATA';
  dialogButts: number = 1;
  
  // http = inject(HttpClient);
  messageService = inject(MessageService);
  subDetailHeadService = inject(SubdetailheadService);
  confirmationService = inject(ConfirmationService);

  ref: DynamicDialogRef | undefined;
  constructor(public dialogService: DialogService, public config : DynamicDialogConfig) { }
  show() {
    this.ref = this.dialogService.open(MastersubdetailheadformComponent, {
      data:{
        dialogButt : 1,
        code : this.codes,
        isDisable : false,
        pgetData : this.getData.bind(this),

      },
      width: '50rem',
      modal:true,
      header: 'ADD SUB DETAIL HEAD DATA' 
    });
  }


  ngOnInit(): void {
    this.tableInitialize();
    this.getData();
    this.getGetCodeFromDetailHead();

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
  getData() {
    this.subDetailHeadService.getMasterSubDetailHead(this.tableQueryParameters).subscribe((response: any) => {
      this.tableData = response.result;
      this.alldata = response.result.dataCount;
    });
  }
  getGetCodeFromDetailHead() {
    this.subDetailHeadService.getDetailHeadCode().subscribe((res: MasterDetailHead[]) => {
      this.codes = res;
    },
      error => {
        console.error('Error fetching codes from Treasury:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch codes from Treasury', life: 2000 });
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
        pgetData : this.getData.bind(this),

      },
      width: '50rem',
      modal:true,
      header: 'EDIT SUB DETAIL HEAD DATA' 
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
        console.error('Error deleting MasterDDO data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete MasterDDO record', life: 2000 });
      }
    );
  }




  viewData(tmpid : number){
    this.subDetailHeadService.getMasterSubDetailHeadById(tmpid).subscribe((res: MasterSubDetailHead) => {
      this.ref = this.dialogService.open(MastersubdetailheadformComponent, {
        data:{
          dialogButt : 3,
          // code : this.codes,
          id : tmpid,
          isDisable : true,
          // pgetData : this.getData.bind(this),
  
        },
        width: '50rem',
        modal:true,
        header: 'VIEW SUB DETAIL HEAD DATA' 
      });
      //this.userForm.markAllAsTouched();
      //this.userForm.markAsDirty();
    },
      error => {
        console.error('Error fetching MasterDDO data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MasterDDO data by ID', life: 2000 });
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

}
