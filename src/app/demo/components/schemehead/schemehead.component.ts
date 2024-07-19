import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { IapiResponce } from 'src/Model/iapi-responce';
import { masterSchemeHead } from 'src/Model/master.model';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
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
  alldata : number = 0;
  apiUrl = 'http://localhost:5271/api/masterSCHEME_HEAD/'
  visible : boolean = false;
  id : number = 0;
  isSubUp : boolean = true;

  http = inject(HttpClient);
  messageService = inject(MessageService)
  headertext:string = 'Add SchemeHeadData';
  constructor() { }

  userForm: FormGroup = new FormGroup({
    demandCode: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    code: new FormControl('',  [Validators.required, Validators.maxLength(3)]),
    name: new FormControl('', Validators.required),
    minorHeadId: new FormControl(null, Validators.required),
  });
 

  ngOnInit(): void {

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
    this.http
      .post<IapiResponce<DynamicTable<masterSchemeHead>>>(this.apiUrl + 'GetMasterSCHEME_HEAD', this.tableQueryParameters)
      .subscribe((response: any) => {
        this.tableData = response.result;
        this.alldata = response.result.dataCount;
        console.log(this.tableData, response);
        

      });
  }

  submit(form : FormGroup){
    console.log(this.userForm.value);
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
      );
    form.reset();
    this.visible=false;
  }

  editData(tmpid: number) {
    this.http.get<masterSchemeHead>(this.apiUrl + 'GetMasterSCHEME_HEADById?id=' + `${tmpid}`).subscribe((res:masterSchemeHead) => {
      console.log(res);
      this.userForm.patchValue({
<<<<<<< Updated upstream
    DemandCode: res.demandCode,
   Code:res.code,
   Name:res.name,
   MinorHeadId:res.minorHeadId
=======
        demandCode: res.demandCode,
        code:res.code,
        name:res.name,
        minorHeadId:res.minorHeadId
>>>>>>> Stashed changes
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
    this.http.put<masterSchemeHead>(this.apiUrl + 'UpdateMasterSCHEME_HEAD?id=' + `${this.id}` , this.userForm.value).subscribe((res : any) =>{
      console.log(res);
      this.getData();
    });
    form.reset();
    this.isSubUp = true;
    this.visible = false;
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Updated', life: 2000 });
  }

  delData(tmpid: number) {
    this.http.delete('http://localhost:5271/api/masterSCHEME_HEAD/DeleteMasterSchemeHead?id=' + `${tmpid}`).subscribe(() => {
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
