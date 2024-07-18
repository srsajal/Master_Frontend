import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { MessageService } from 'primeng/api';
import { IapiResponce } from 'src/Model/iapi-responce';
import { Code, MasterDdo } from 'src/Model/master.model';
import { MhPrimeDynamicTableModule } from 'mh-prime-dynamic-table';
import { MasterService } from '../../service/master.service';
import { log } from 'console';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MasterddoformsComponent } from '../masterForms/masterddoforms/masterddoforms.component';


@Component({
  selector: 'app-masterddo',
  templateUrl: './masterddo.component.html',
  styleUrls: ['./masterddo.component.scss']
})
export class MasterddoComponent implements OnInit {
  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  alldata: number = 0;
  // apiUrl = 'http://localhost:5271/api/masterDDO/'
  visible: boolean = false;
  id: number = 0;
  codes: Code[] = [];
  // headertext: string = 'ADD DDO DATA';
  dialogButts: number = 1;
  
  // http = inject(HttpClient);
  messageService = inject(MessageService);
  masterService = inject(MasterService);

  ref: DynamicDialogRef | undefined;
  constructor(public dialogService: DialogService, public config : DynamicDialogConfig) { }
  show() {
    this.ref = this.dialogService.open(MasterddoformsComponent, {
      data:{
        dialogButt : 1,
        code : this.codes,
        isDisable : false,
        pgetData : this.getData.bind(this),

      },
      width: '50rem',
      modal:true,
      header: 'ADD DDO DATA' 
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
    this.getCodeFromTreasury();
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
  getData() {
    this.masterService.getMasterDDO(this.tableQueryParameters).subscribe((response: any) => {
      this.tableData = response.result;
      this.alldata = response.result.dataCount;
      // console.log(this.tableData, response);
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
      data:{
        dialogButt : 2,
        code : this.codes,
        id : tmpid,
        isDisable : false,
        pgetData : this.getData.bind(this),

      },
      width: '50rem',
      modal:true,
      header: 'EDIT DDO DATA' 
    });
  }
  delData(tmpid: number) {
    this.masterService.deleteMasterDDOById(tmpid).subscribe(() => {
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
    this.masterService.getMasterDDOById(tmpid).subscribe((res: MasterDdo) => {
      this.ref = this.dialogService.open(MasterddoformsComponent, {
        data:{
          dialogButt : 3,
          code : this.codes,
          id : tmpid,
          isDisable : true,
          // pgetData : this.getData.bind(this),
  
        },
        width: '50rem',
        modal:true,
        header: 'EDIT DDO DATA' 
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
      this.delData(event.rowData.id);
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
