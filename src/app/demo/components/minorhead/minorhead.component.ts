import { Component, OnInit, inject } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Code, minorHead } from 'src/Model/master.model';
import { MinorheadService } from 'src/app/demo/service/MasterService/minorhead.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MasterMinorheadFormsComponent } from '../masterForms/master-minorhead-forms/master-minorhead-forms.component';
@Component({
  selector: 'app-minorhead',
  templateUrl: './minorhead.component.html',
  styleUrls: ['./minorhead.component.scss']
})
export class MinorheadComponent implements OnInit {

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
  totalActiveMinorHead: number = 0;
  totalInactiveMinorHead: number = 0;

  // http = inject(HttpClient);
  messageService = inject(MessageService);
  masterService = inject(MinorheadService);
  confirmationService = inject(ConfirmationService);

  ref: DynamicDialogRef | undefined;
  constructor(public dialogService: DialogService, public config: DynamicDialogConfig) {
    this.items = [
      { label: 'Master Management' },
      { label: 'Minor Head' },
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
   }
  show() {
    this.ref = this.dialogService.open(MasterMinorheadFormsComponent, {
      data: {
        dialogButt: 1,
        code: this.codes,
        isDisable: false,
        pgetData: this.showNormalData.bind(this),

      },
      width: '50rem',
      modal: true,
      header: 'ADD MINOR HEAD DATA',
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
    this.masterService.getmasterMinorhead(isActive, this.tableQueryParameters).subscribe((response: any) => {
      this.istableLoading = false;
      this.tableData = response.result;
      this.alldata = response.result.dataCount;
    });
  }

  getDataCount() {
    this.masterService.countMasterMinorhead(true, this.tableQueryParameters).subscribe((res: any) => {
      this.totalActiveMinorHead = res;
    });
    this.masterService.countMasterMinorhead(false, this.tableQueryParameters).subscribe((res: any) => {
      this.totalInactiveMinorHead = res;
    });
  }
  getCodeFromTreasury() {
    this.masterService.getMasterCodeSubmajorhead().subscribe((res: Code[]) => {
      this.codes = res;
    },
      error => {
        console.error('Error fetching codes from Treasury:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch codes from Treasury', life: 2000 });
      }
    );
  }

  editData(tmpid: number) {
    this.ref = this.dialogService.open(MasterMinorheadFormsComponent, {
      data: {
        dialogButt: 2,
        code: this.codes,
        id: tmpid,
        isDisable: false,
        pgetData: this.showNormalData.bind(this),

      },
      width: '50rem',
      modal: true,
      header: 'EDIT MINOR DATA',
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
    this.masterService.deleteMasterMinorheadById(tmpid).subscribe(() => {
      this.showNormalData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 2000 });
    },
      error => {
        console.error('Error deleting MINORHEAD data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete Master MINORHEAD record', life: 2000 });
      }
    );
  }
  restoreData(tmpid: number) {
    this.masterService.restoreMasterMinorheadById(tmpid).subscribe(() => {
      this.showDeletedData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record restored', life: 2000 });
    },
      error => {
        console.error('Error deleting MINORHEAD data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to restore MINORHEAD record', life: 2000 });
      }
    );
  }





  viewData(tmpid: number) {
    this.masterService.getMasterMinorheadById(tmpid).subscribe((res: minorHead) => {
      this.ref = this.dialogService.open(MasterMinorheadFormsComponent, {
        data: {
          dialogButt: 3,
          code: this.codes,
          id: tmpid,
          isDisable: true,

        },
        width: '50rem',
        modal: true,
        header: 'EDIT MINOR DATA',
        contentStyle: {
          'background-color': '#f3e5f5',
          'padding': '20px',
          'border-radius': '8px',
          'color': '#4a148c',
        }
      });
    },
      error => {
        console.error('Error fetching MINORHEAD data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MINORHEAD data by ID', life: 2000 });
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

  }
  handleChange(event: any) {
    if (event.index === 0) {
      this.showNormalData();
    } else if (event.index === 1) {
      this.showDeletedData();
    }
  }
 

}
