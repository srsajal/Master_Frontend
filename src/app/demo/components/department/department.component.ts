import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { MessageService } from 'primeng/api';
import { IapiResponce } from 'src/Model/iapi-responce';
import {Masterdept } from 'src/Model/master.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  alldata : number = 0;
  apiUrl = 'http://localhost:5271/api/MasterDepartment/'
  visible : boolean = false;
  id : number = 0;
  isSubUp : boolean = true;

  http = inject(HttpClient);
  messageService = inject(MessageService)
  constructor() { }

  userForm: FormGroup = new FormGroup({
    Code: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    Name: new FormControl(''),
    Demand: new FormControl(''),
    Address: new FormControl(''),
    Pin: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    Phone: new FormControl(''),
    Mobile: new FormControl(''),
    Email: new FormControl('')
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
      .post<IapiResponce<DynamicTable<Masterdept>>>(this.apiUrl + 'GetMasterDepartment', this.tableQueryParameters)
      .subscribe((response: any) => {
        this.tableData = response.result;
        this.alldata = response.result.dataCount;
        console.log(this.tableData, response);
        

      });
  }

  submit(form : FormGroup){
    this.http.post<Masterdept>(this.apiUrl + 'AddMasterDepartment', this.userForm.value).subscribe((res : any) =>{
      console.log(res);
      this.getData();
    });
    form.reset();
    this.visible=false;
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
  }

  editData(tmpid: number) {
    this.http.get<Masterdept>(this.apiUrl + 'GetMasterDepartmentById?id=' + `${tmpid}`).subscribe((res:Masterdept) => {
      console.log(res);
      this.userForm.patchValue({
        Code: res.code,
        Name: res.name,
        Demand: res.demandcode,
        Address: res.address,
        Pin: res.pincode,
        Phone: res.phoneno,
        Mobile: res.mobileno,
        Email :  res.email
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
    this.http.put<Masterdept>(this.apiUrl + 'UpdateMasterDepartment?id=' + `${this.id}` , this.userForm.value).subscribe((res : any) =>{
      console.log(res);
      this.getData();
    });
    form.reset();
    this.isSubUp = true;
    this.visible = false;
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Updated', life: 2000 });
  }

  delData(tmpid: number) {
    this.http.delete(this.apiUrl + 'DeleteMasterDepartment?id=' + `${tmpid}`).subscribe(() => {
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
