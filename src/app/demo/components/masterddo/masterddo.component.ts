import { Component, OnInit, inject } from '@angular/core';
import { ActionButtonConfig, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Code, MasterDdo } from 'src/Model/master.model';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MasterddoformsComponent } from '../masterForms/masterddoforms/masterddoforms.component';
import { MasterService } from '../../service/MasterService/masterddo.service';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-masterddo',
  templateUrl: './masterddo.component.html',
  styleUrls: ['./masterddo.component.scss']
})
export class MasterddoComponent implements OnInit {
  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  istableLoading: boolean = false;
  alldata: number = 0;
  visible: boolean = false;
  id: number = 0;
  codes: Code[] = [];
  dialogButts: number = 1;
  totalActiveDdo: number = 0;
  totalInactiveDdo: number = 0;
  items: MenuItem[];
  home: MenuItem;

  messageService = inject(MessageService);
  masterService = inject(MasterService);
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
    this.ref = this.dialogService.open(MasterddoformsComponent, {
      data: {
        dialogButt: 1,
        code: this.codes,
        isDisable: false,
        pgetData: this.showNormalData.bind(this),

      },
      width: '50rem',
      modal: true,
      header: 'ADD DDO DATA',
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
    this.masterService.getMasterDDO(isActive, this.tableQueryParameters).subscribe((response: any) => {
      this.istableLoading = false;
      this.tableData = response.result;
      this.alldata = response.result.dataCount;
    });
  }
  getCodeFromTreasury() {
    this.masterService.getMasterCodeTreasury().subscribe((res: Code[]) => {
      this.codes = res;
    },
      error => {
        console.error('Error fetching codes from Treasury:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch codes from Treasury', life: 2000 });
      }
    );
  }

  editData(tmpid: number) {
    this.ref = this.dialogService.open(MasterddoformsComponent, {
      data: {
        dialogButt: 2,
        code: this.codes,
        id: tmpid,
        isDisable: false,
        pgetData: this.showNormalData.bind(this),

      },
      width: '50rem',
      modal: true,
      header: 'EDIT DDO DATA',
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
    this.masterService.deleteMasterDDOById(tmpid).subscribe(() => {
      this.showNormalData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 2000 });
    },
      error => {
        console.error('Error deleting MasterDDO data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete MasterDDO record', life: 2000 });
      }
    );
  }
  restoreData(tmpid: number) {
    this.masterService.restoreMasterDdoById(tmpid).subscribe(() => {
      this.showDeletedData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record restored', life: 2000 });
    },
      error => {
        console.error('Error deleting MasterDDO data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to restore MasterDDO record', life: 2000 });
      }
    );
  }

  getDataCount() {
    this.masterService.countMasterDdo(true, this.tableQueryParameters).subscribe((res: any) => {
      this.totalActiveDdo = res;
    });
    this.masterService.countMasterDdo(false, this.tableQueryParameters).subscribe((res: any) => {
      this.totalInactiveDdo = res;
    });
  }

  viewData(tmpid: number) {
    this.masterService.getMasterDDOById(tmpid).subscribe((res: MasterDdo) => {
      this.ref = this.dialogService.open(MasterddoformsComponent, {
        data: {
          dialogButt: 3,
          code: this.codes,
          id: tmpid,
          isDisable: true,

        },
        width: '50rem',
        modal: true,
        header: 'EDIT DDO DATA',
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
