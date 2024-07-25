import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { IapiResponce } from 'src/Model/iapi-responce';
import { Code, majorHead, MasterDetailHead, submajorhead } from 'src/Model/master.model';
import { SubmajorheadService } from '../../service/MasterService/submajorhead.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubMajorHeadFormsComponent } from '../masterForms/sub-major-head-forms/sub-major-head-forms.component';

@Component({
  selector: 'app-submajorhead',
  templateUrl: './submajorhead.component.html',
  styleUrls: ['./submajorhead.component.scss']
})
export class SubmajorheadComponent implements OnInit {

  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  istableLoading: boolean = false;
  alldata: number = 0;
  visible: boolean = false;
  id: number = 0;
  codes: Code[] = [];
  dialogButts: number = 1;
  items: MenuItem[];
  home: MenuItem;
  totalActiveSubMajorHead: number = 0;
  totalInactiveSubMajorHead: number = 0;

  messageService = inject(MessageService);
  masterService = inject(SubmajorheadService);
  confirmationService = inject(ConfirmationService);

  ref: DynamicDialogRef | undefined;
  constructor(public dialogService: DialogService, public config: DynamicDialogConfig) {
    this.items = [
      { label: 'Master Management' },
      { label: 'Treasury' },
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
   }
  show() {
    this.ref = this.dialogService.open(SubMajorHeadFormsComponent, {
      data: {
        dialogButt: 1,
        code: this.codes,
        isDisable: false,
        pgetData: this.showNormalData.bind(this),

      },
      width: '50rem',
      modal: true,
      header: 'ADD SUBMAJORHEAD DATA'
    });
  }

  ngOnInit(): void {
    this.tableInitialize();
    this.getData();
   this.getCodeFromMajorHead();

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
    this.masterService.getsubMajorHeadData(isActive, this.tableQueryParameters).subscribe((response: any) => {
      this.istableLoading = false;
      this.tableData = response.result;
      this.alldata = response.result.dataCount;

      console.log(response);
    });
  }

  getDataCount() {
    this.masterService.countMasterSubMajorhead(true, this.tableQueryParameters).subscribe((res: any) => {
      this.totalActiveSubMajorHead = res;
    });
    this.masterService.countMasterSubMajorhead(false, this.tableQueryParameters).subscribe((res: any) => {
      this.totalInactiveSubMajorHead = res;
    });
  }

  getCodeFromMajorHead() {
    this.masterService.getMajorheadcode().subscribe((res: Code[]) => {
      this.codes = res;
      console.log(res);

    },
      error => {
        console.error('Error fetching codes from Treasury:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch codes from Treasury', life: 2000 });
      }
    );
  }

  editData(tmpid: number) {
    this.ref = this.dialogService.open(SubMajorHeadFormsComponent, {
      data: {
        dialogButt: 2,
        code: this.codes,
        id: tmpid,
        isDisable: false,
        pgetData: this.showNormalData.bind(this),

      },
      width: '50rem',
      modal: true,
      header: 'EDIT SUBMAJORHEAD DATA'
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
    this.masterService.delsubMajorHeadData(tmpid).subscribe(() => {
      this.showNormalData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 2000 });
    },
      error => {
        console.error('Error deleting MasterDDO data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete MasterDDO record', life: 2000 });
      }
    );
  }




  viewData(tmpid: number) {
    this.masterService.getsubMajorHeadDataById(tmpid).subscribe((res: submajorhead) => {
      this.ref = this.dialogService.open(SubMajorHeadFormsComponent, {
        data: {
          dialogButt: 3,
          code: this.codes,
          id: tmpid,
          isDisable: true,

        },
        width: '50rem',
        modal: true,
        header: 'EDIT SUBMAJORHEAD DATA'
      });
    },
      error => {
        console.error('Error fetching MasterDDO data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MasterDDO data by ID', life: 2000 });
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
    // else if (event.buttonIdentifier == "restore") {
    //   this.restoreData(event.rowData.id);
    // }
  }
  handQueryParameterChange(event: any) {
    this.tableQueryParameters = {
      pageSize: event.pageSize,
      pageIndex: event.pageIndex,
      filterParameters: event.filterParameters || [],
    };
    console.log(this.tableQueryParameters)
    this.getData();
  }
  handleSearch(event: any) {
  }
  handleChange(event: any) {
    if (event.index === 0) {
      this.showNormalData();
    } else if (event.index === 1) {
      this.showDeletedData();
    }
  }
  
}
