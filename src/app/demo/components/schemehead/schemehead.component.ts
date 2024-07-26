import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { IapiResponce } from 'src/Model/iapi-responce';
import { Code, masterSchemeHead, minorheadid } from 'src/Model/master.model';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { log } from 'console';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MasterSCHEMEHEADService } from '../../service/MasterService/master-schemehead.service';
import { MasterSchemeHeadFormsComponent } from '../masterForms/master-scheme-head-forms/master-scheme-head-forms.component';
// import { IapiResponce } from 'src/Model/iapi-responce';
@Component({
  selector: 'app-schemehead',
  templateUrl: './schemehead.component.html',
  styleUrls: ['./schemehead.component.scss']
})
export class SchemeheadComponent implements OnInit {
  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  istableLoading: boolean = false;
  alldata: number = 0;
  visible: boolean = false;
  id: number = 0;
  codes: minorheadid[] = [];
  dialogButts: number = 1;
  totalActiveSchemeHead: number = 0;
  totalInactiveSchemeHead: number = 0;
  items: MenuItem[];
  home: MenuItem;

  messageService = inject(MessageService);
  masterService = inject(MasterSCHEMEHEADService);
  confirmationService = inject(ConfirmationService);

  ref: DynamicDialogRef | undefined;
  constructor(public dialogService: DialogService, public config: DynamicDialogConfig) {
    this.items = [
      { label: 'Master Management' },
      { label: 'DDO' },
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
  show() {
    this.ref = this.dialogService.open(MasterSchemeHeadFormsComponent, {
      data: {
        dialogButt: 1,
        code: this.codes,
        isDisable: false,
        pgetData: this.showNormalData.bind(this),

      },
      width: '50rem',
      modal: true,
      header: 'ADD SchemeHead DATA',
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
    this.getCodeFromTreasury();


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
  getData(isActive: boolean = true) {
    this.istableLoading = true;
    this.getDataCount();
    this.masterService.getmasterSCHEME_HEAD(isActive, this.tableQueryParameters).subscribe((response: any) => {
      this.istableLoading = false;
      this.tableData = response.result;
      this.alldata = response.result.dataCount;
    });
  }
  getCodeFromTreasury() {
    this.masterService.getMasterCodeMinorHead().subscribe((res: minorheadid[]) => {
      this.codes = res;
    },
      error => {
        console.error('Error fetching codes from Treasury:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch codes from MinorHead', life: 2000 });
      }
    );
  }

  editData(tmpid: number) {
    this.ref = this.dialogService.open(MasterSchemeHeadFormsComponent, {
      data: {
        dialogButt: 2,
        code: this.codes,
        id: tmpid,
        isDisable: false,
        pgetData: this.showNormalData.bind(this),

      },
      width: '50rem',
      modal: true,
      header: 'EDIT SCHEMEHEAD DATA',
      contentStyle: {
        'background-color': '#fff3e0', 
        'padding': '20px',
        'border-radius': '8px',
        'color': '#e65100',
      }
    });
  }

  confirmDelete(id: number) {
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
    this.masterService.deletemasterSCHEME_HEAD(tmpid).subscribe(() => {
      this.showNormalData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 2000 });
    },
      error => {
        console.error('Error deleting MasterDDO data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete MasterSchemeHead record', life: 2000 });
      }
    );
  }
  restoreData(tmpid: number) {
    this.masterService.restoremasterSCHEME_HEADById(tmpid).subscribe(() => {
      this.showDeletedData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record restored', life: 2000 });
    },
      error => {
        console.error('Error deleting MasterDDO data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to restore MasterSchemeHead record', life: 2000 });
      }
    );
  }

  getDataCount() {
    this.masterService.countMasterSchemeHead(true, this.tableQueryParameters).subscribe((res: any) => {
      this.totalActiveSchemeHead = res;
    });
    this.masterService.countMasterSchemeHead(false, this.tableQueryParameters).subscribe((res: any) => {
      this.totalInactiveSchemeHead = res;
    });
  }

  viewData(tmpid: number) {
    this.masterService.GetMasterSCHEME_HEADById(tmpid).subscribe((res: masterSchemeHead) => {
      this.ref = this.dialogService.open(MasterSchemeHeadFormsComponent, {
        data: {
          dialogButt: 3,
          code: this.codes,
          id: tmpid,
          isDisable: true,

        },
        width: '50rem',
        modal: true,
        header: 'VIEW SCHEMEHEAD DATA',
        contentStyle: {
          'background-color': '#f3e5f5',
          'padding': '20px',
          'border-radius': '8px',
          'color': '#4a148c',
        }
      });
    },
      error => {
        console.error('Error fetching MasterDDO data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MasterSchemeHead data by ID', life: 2000 });
      }
    );
  }

  showDeletedData() {
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
  showNormalData() {
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
    this.getData(true);
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
    
    this.tableQueryParameters.filterParameters.push({
      field: 'id',
      value: event,
      operator: 'contains'
    })
    this.showNormalData();
  }
  handleChange(event: any) {
    if (event.index === 0) {
      this.showNormalData();
    } else if (event.index === 1) {
      this.showDeletedData();
    }
  }
}
