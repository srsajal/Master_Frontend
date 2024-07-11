import { Component, OnInit , inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { MessageService } from 'primeng/api';
import { IapiResponce } from 'src/Model/iapi-responce';
//import { MasterTreasury } from 'src/Model/master-treasury.model';
import { HttpClient } from '@angular/common/http';
import { MasterTreasury } from 'src/Model/master.model';

@Component({
  selector: 'app-treasury',
  templateUrl: './treasury.component.html',
  styleUrls: ['./treasury.component.scss']
})
export class TreasuryComponent implements OnInit {

  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  alldata : number = 0;
  apiUrl = 'http://localhost:5271/api/masterTreasury/'
  visible : boolean = false;
  id : number = 0;
  isSubUp : boolean = true;

  http = inject(HttpClient);
  messageService = inject(MessageService);
  constructor() { }
  userForm: FormGroup = new FormGroup({
    districtName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    districtCode: new FormControl(null),
    Code: new FormControl('', [Validators.required,Validators.maxLength(3)]),
    name: new FormControl('', [Validators.required,Validators.maxLength(100)])
   
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

  // submit(){
  //   this.http.post<MasterTreasury>(this.apiUrl + 'AddMasterTreasury', this.userForm).subscribe((res : any) =>{
  //     console.log(res);
  //     this.getData();
  //     alert("Saved Successfully");
  //   });
  //   //form.reset();
  //   this.visible=false;
  //   this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
  // }
  submit(form : FormGroup){
    //alert(this.userForm.value);
    this.http.post<MasterTreasury>(this.apiUrl + 'AddMasterTreasury', this.userForm.value).subscribe((res : any) =>{
      console.log(res);
      this.getData();
    });
    form.reset();
    this.visible=false;
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
  }

  getData() {
    this.http
      .post<IapiResponce<DynamicTable<MasterTreasury>>>(this.apiUrl + 'GetMasterTreasury', this.tableQueryParameters)
      .subscribe((response: any) => {
        this.tableData = response.result;
        this.alldata = response.result.dataCount;
        console.log(this.tableData, response);
        

      });
  }
  editData(tmpid: number) {
    this.http.get<MasterTreasury>(this.apiUrl + 'GetMasterTreasuryById?id=' + `${tmpid}`).subscribe((res:MasterTreasury) => {
      console.log(res);
      this.userForm.patchValue({
        districtName: res.districtName,
        districtCode: res.districtCode,
        Code: res.code,
        name: res.name
        
      });
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    },
      error => {
        console.error('Error fetching student data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch student data by ID', life: 2000 });
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
    this.http.put<MasterTreasury>(this.apiUrl + 'UpdateMasterTreasury?id=' + `${this.id}` , this.userForm.value).subscribe((res : any) =>{
      console.log(res);
      this.getData();
    });
    form.reset();
    this.isSubUp = true;
    this.visible = false;
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Updated', life: 2000 });
  }
  

  delData(tmpid: number) {
    this.http.delete(this.apiUrl + 'DeleteMasterTreasury?id=' + `${tmpid}`).subscribe(() => {
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
    // 
    //this.submit();
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
