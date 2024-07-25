import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IapiResponce } from 'src/Model/iapi-responce';
import { Code, Masterdept } from 'src/Model/master.model';
import { DepartmentServiceService } from '../../service/MasterService/department-service.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DepartmentformsComponent } from '../masterForms/departmentforms/departmentforms.component';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  istableLoading: boolean = false;
  alldata: number = 0;
  visible: boolean = false;
  id: number = 0;
  codes: Code[] = [];
  // headertext: string = 'ADD DDO DATA';
  dialogButts: number = 1;

  // http = inject(HttpClient);
  messageService = inject(MessageService);
  masterService = inject(DepartmentServiceService);
  confirmationService = inject(ConfirmationService);

  ref: DynamicDialogRef | undefined;
  constructor(public dialogService: DialogService, public config: DynamicDialogConfig) { }
  show() {
    this.ref = this.dialogService.open(DepartmentformsComponent, {
      data: {
        dialogButt: 1,
        code: this.codes,
        isDisable: false,
        pgetData: this.getData.bind(this),

      },
      width: '50rem',
      modal: true,
      header: 'ADD TREASURY DATA'
    });
  }

  // userForm: FormGroup = new FormGroup({
  //   TreasuryCode: new FormControl('', [Validators.required, Validators.maxLength(3)]),
  //   Code: new FormControl('', Validators.required),
  //   Designation: new FormControl('', Validators.required),
  //   Address: new FormControl(''),
  //   Phone: new FormControl('', [Validators.required, Validators.maxLength(15)])
  // });

  ngOnInit(): void {
    // this.userForm.reset();
    // this.userForm = this.initializeMasterForm();
    this.tableInitialize();
    this.getData();
   // this.getCodeFromTreasury();
    // console.log("table reloaded");

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
    // this.tableQueryParameters.filterParameters.push({
    //   field: 'Id',
    //   value: '1685',
    //   operator:'equals'
    // });
    this.istableLoading = true;
    this.masterService.getMasterDepartment(isActive, this.tableQueryParameters).subscribe((response: any) => {
      this.istableLoading = false;
      this.tableData = response.result;
      this.alldata = response.result.dataCount;

      console.log(response);
    });
  }
  // getCodeFromTreasury() {
  //   this.masterService.getMasterCodeTreasury().subscribe((res: Code[]) => {
  //     this.codes = res;
  //     console.log(res);

  //   },
  //     error => {
  //       console.error('Error fetching codes from Treasury:', error);
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch codes from Treasury', life: 2000 });
  //     }
  //   );
  // }

  editData(tmpid: number) {
    this.ref = this.dialogService.open(DepartmentformsComponent, {
      data: {
        dialogButt: 2,
        code: this.codes,
        id: tmpid,
        isDisable: false,
        pgetData: this.showNormalData.bind(this),

      },
      width: '50rem',
      modal: true,
      header: 'EDIT TREASURY DATA'
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
    this.masterService.deleteMasterDepartmentById(tmpid).subscribe(() => {
      this.showNormalData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 2000 });
    },
      error => {
        console.error('Error deleting MasterDDO data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete MasterDDO record', life: 2000 });
      }
    );
  }
  // restoreData(tmpid: number) {
  //   this.masterService.restoreMasterTreasuryById(tmpid).subscribe(() => {
  //     this.showDeletedData();
  //     this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record restored', life: 2000 });
  //   },
  //     error => {
  //       console.error('Error deleting MasterDDO data:', error);
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to restore MasterDDO record', life: 2000 });
  //     }
  //   );
  // }





  viewData(tmpid: number) {
    this.masterService.getMasterDepartmentById(tmpid).subscribe((res: Masterdept) => {
      this.ref = this.dialogService.open(DepartmentformsComponent, {
        data: {
          dialogButt: 3,
          code: this.codes,
          id: tmpid,
          isDisable: true,
          // pgetData : this.getData.bind(this),

        },
        width: '50rem',
        modal: true,
        header: 'EDIT TREASURY DATA'
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
    // this.tableQueryParameters.filterParameters = [];
    // this.tableData.headers.forEach((element: { filterField: any; }) => {
    //   this.tableQueryParameters.filterParameters.push({
    //     field: element.filterField,
    //     value: event,
    //     operator: 'contains'
    //   });
    // });
    console.log(event);
    // console.log(this.tableQueryParameters);
    // this.getData();
  }

}
