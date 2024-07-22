import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { IapiResponce } from 'src/Model/iapi-responce';
import { Code, masterSchemeHead, minorheadid } from 'src/Model/master.model';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { log } from 'console';
import { SchemeHeadServiceService } from '../../service/MasterService/master-schemehead.service';
// import { IapiResponce } from 'src/Model/iapi-responce';
@Component({
  selector: 'app-schemehead',
  templateUrl: './schemehead.component.html',
  styleUrls: ['./schemehead.component.scss']
})
export class SchemeheadComponent implements OnInit {
  codes: minorheadid[] = [];
  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  alldata : number = 0;
 // apiUrl = 'http://localhost:5271/api/masterSCHEME_HEAD/'
  visible : boolean = false;
  id : number = 0;
  isSubUp : boolean = true;

  http = inject(HttpClient);
  messageService = inject(MessageService)
  headertext:string = 'Add SchemeHeadData';
  constructor(private schemeheadservice : SchemeHeadServiceService) { }

  userForm: FormGroup = new FormGroup({
    demandCode: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    code: new FormControl('',  [Validators.required, Validators.maxLength(3)]),
    name: new FormControl('', Validators.required),
    minorHeadId: new FormControl('', Validators.required),
  });
 

  ngOnInit(): void {
    this.getCodeFromMinorhead()

    this.actionButtonConfig = [
      // {
      //   buttonIdentifier: 'view',
      //   class: 'p-button-rounded p-button-raised',
      //   icon: 'pi pi-eye',
      //   lable: 'View',
      // },
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

  getData() {
    this.schemeheadservice.getmasterSCHEME_HEAD (this.tableQueryParameters)
      .subscribe((response: any) => {
        this.tableData = response.result;
        this.alldata = response.result.dataCount;
        console.log(this.tableData, response);
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
    //debugger;
    alert('Form Submitted');

      if (this.userForm.valid) {
      //console.log(this.userForm.value);
      this.schemeheadservice.postmasterSCHEME_HEAD(this.userForm).subscribe({
        next: (res: masterSchemeHead) => {
          console.log(res);
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
        },
        error: (error: any) => {
          console.error('Error adding MasterSchemeHead data:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Master SchemeHead data', life: 2000 });
        }
      });
      form.reset();
      this.visible = false;
    }
    else {
      this.messageService.add({ severity: 'warn', summary: 'warn', detail: 'Form  Invalid !!', life: 2000 });
    }

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
      this.delData(event.rowData.id);
    }
    else {

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


}
