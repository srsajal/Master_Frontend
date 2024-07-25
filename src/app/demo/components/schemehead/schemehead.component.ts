import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { IapiResponce } from 'src/Model/iapi-responce';
import { Code, masterSchemeHead, minorheadid } from 'src/Model/master.model';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { log } from 'console';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SchemeHeadServiceService } from '../../service/MasterService/master-schemehead.service';
import { MasterSchemeHeadFormsComponent } from '../masterForms/master-scheme-head-forms/master-scheme-head-forms.component';
// import { IapiResponce } from 'src/Model/iapi-responce';
@Component({
  selector: 'app-schemehead',
  templateUrl: './schemehead.component.html',
  styleUrls: ['./schemehead.component.scss']
})
export class SchemeheadComponent implements OnInit {
  tooltip: any;
  ref: DynamicDialogRef | undefined;
  type:any
  istableLoading:boolean = false;
  codes: minorheadid[] = [];
  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  alldata : number = 0;
  //apiUrl = 'http://localhost:5271/api/masterSCHEME_HEAD/'
  visible : boolean = false;
  id : number = 0;
  isSubUp : boolean = true;
  totalActiveSchemeHead:number =0;
  totalInactiveSchemeHead:number =0;
  http = inject(HttpClient);
  messageService = inject(MessageService)
  headertext:string = 'Add SchemeHeadData';
  constructor(private schemeheadservice : SchemeHeadServiceService,private confirmationService: ConfirmationService, private dialogService:DialogService) { }

  userForm: FormGroup = new FormGroup({
    demandCode: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    code: new FormControl('',  [Validators.required, Validators.maxLength(3)]),
    name: new FormControl('', Validators.required),
    minorHeadId: new FormControl('', Validators.required),
  });
 

  ngOnInit(): void {
    this.getDataCount();
    this.getCodeFromMinorhead();


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
    console.log(this.tableData);
  }

  getData(isActive: boolean = true) {
    this.istableLoading=true;
    this.schemeheadservice.getmasterSCHEME_HEAD (isActive,this.tableQueryParameters)
      .subscribe((response: any) => {
        this.istableLoading = false;
        this.tableData = response.result;
        this.alldata = response.result.dataCount;
        console.log(this.tableData, response);
        

      });
  }
  getDataCount(){
    this.schemeheadservice.countMasterSchemeHead(true,this.tableQueryParameters).subscribe((res:any)=> {
      this.totalActiveSchemeHead = res;
    });
    this.schemeheadservice.countMasterSchemeHead(false,this.tableQueryParameters).subscribe((res:any)=> {
      this.totalInactiveSchemeHead = res;
    });
  }
  getCodeFromMinorhead() {
    this.http.get<minorheadid[]>('http://localhost:5271/api/masterSCHEME_HEAD/GetMasterSCHEME_HEADfromMINORHEADId').subscribe({
      next: (res: minorheadid[]) => {
        this.codes = res;
        console.log(res);

      },
      error: (error) => {
        console.error('Error fetching codes from Treasury:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch codes from Treasury', life: 2000 });
      }
    });
  }
  submit(form : FormGroup){
    console.log(this.userForm.value);
    if(this.userForm.valid){
    const data =this.userForm.value
    this.http.post<masterSchemeHead>( 'http://localhost:5271/api/masterSCHEME_HEAD/AddmasterSCHEME-HEAD', data)
      .subscribe(
        (res:any) => {
          console.log(res);
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
        },
        (error: any) => {
          console.error('Error submitting form:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to submit form', life: 2000 });
        }
      );}
      else{
        this.messageService.add({ severity: 'warn', summary: 'warn', detail: 'Invalid Form', life: 2000 });}
    form.reset();
    this.visible=false;
  }

  editData(tmpid: number) {
    this.schemeheadservice.GetMasterSCHEME_HEADById(tmpid).subscribe((res: masterSchemeHead) => {
        console.log(res);
      this.userForm.patchValue({
        demandCode: res.demandCode,
        code:res.code,
        name:res.name,
        minorHeadId:res.minorHeadId
      });
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    },
      error => {
        console.error('Error fetching Data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data', life: 2000 });
      }
    );
    this.visible = true;
    this.id = tmpid;
    this.isSubUp = false;
  }
  // editData(tmpid: number) {
  //   this.ref = this.dialogService.open(MasterSchemeHeadFormsComponent, {
  //     data: {
  //       dialogButt: 2,
  //       code: this.codes,
  //       id: tmpid,
  //       isDisable: false,
  //       pgetData: this.showNormalData.bind(this),

  //     },
  //     width: '50rem',
  //     modal: true,
  //     header: 'EDIT Scheme Head DATA'
  //   });
  // }
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
  cancel(form: FormGroup) {
    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have Cancelled', life: 2000 });
    form.reset();
    this.isSubUp = true;
    this.visible = false;
  }
  hide(form: FormGroup) {
    form.reset();
    this.isSubUp = true;
    this.visible = false;
  }

  update(form : FormGroup){
    if(this.userForm.valid){
      this.schemeheadservice.updatemasterSCHEME_HEAD(this.id, this.userForm).subscribe((res : any) =>{
        console.log(res);
        this.getData();
      });
    }
 
    form.reset();
    this.isSubUp = true;
    this.visible = false;
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Updated', life: 2000 });
  
  }

  delData(tmpid: number) {
    this.schemeheadservice.deletemasterSCHEME_HEAD(tmpid).subscribe(() => {
      this.getData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 2000 });
    },
    error => {
      console.error('Error deleting student data:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete record', life: 2000 });
    }
  );
  }

  showDialog() {
    // console.log("showdialog called");
    this.visible = true;
  }

  handleRowSelection($event: any) {
    console.log("Download the details from above");
  }
  handleButtonClick(event: any) {
    if (event.buttonIdentifier == "edit") {
      this.editData(event.rowData.id);
    }
    else if (event.buttonIdentifier == "del") {
      this.confirm2(event.rowData.id);
    }
    else if (event.buttonIdentifier == "restore") {
      this.restoreData(event.rowData.id);
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
  
  restoreData(tmpid: number) {
   
        this.schemeheadservice.restoremasterSCHEME_HEADById(tmpid).subscribe(() => {
      this.showDeletedData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record restored', life: 2000 });
    },
      error => {
        console.error('Error deleting MasterDDO data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to restore MasterDDO record', life: 2000 });
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
  confirm2(tmpid: number) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.delData(tmpid);
        },
        reject: () => {
          this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});

        }
    });
}
viewData(tmpid: number) {
  this.schemeheadservice.GetMasterSCHEME_HEADById(tmpid).subscribe((res: masterSchemeHead) => {
    this.ref = this.dialogService.open(MasterSchemeHeadFormsComponent, {
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
handleChange(event: any) {
  if (event.index === 0) {
    this.showNormalData();
  } else if (event.index === 1) {
    this.showDeletedData();
  }
}
}
