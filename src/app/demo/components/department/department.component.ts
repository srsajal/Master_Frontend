import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { MessageService } from 'primeng/api';
import { IapiResponce } from 'src/Model/iapi-responce';
import { Masterdept } from 'src/Model/master.model';
import { DepartmentServiceService } from '../../service/MasterService/department-service.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  alldata: number = 0;
  headertext = 'Add Department';
  visible: boolean = false;
  id: number = 0;
  isSubUp: boolean = true;

  http = inject(HttpClient);
  messageService = inject(MessageService)
  constructor(private deptservice: DepartmentServiceService) { }

  userForm: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    demandCode: new FormControl('', [Validators.required, Validators.minLength(1)]),
    address: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email: new FormControl('', [Validators.required, Validators.email])
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
    this.deptservice.getMasterDepartment(true,this.tableQueryParameters).subscribe((response: any) => {
      this.tableData = response.result;
      this.alldata = response.result.dataCount;
      console.log(this.tableData, response);


    });
  }

  submit(form: FormGroup) {
    if (!this.userForm.invalid) {
      console.log(this.userForm.value);
      this.deptservice.postMasterDepartment(this.userForm).subscribe((res: Masterdept) => {
        console.log(res);
        this.getData();
      });
      form.reset();
      this.visible = false;
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
    }
    else {
      this.messageService.add({ severity: 'warn', summary: 'warn', detail: 'Form  Invalid !!', life: 2000 });
    }

  }

  editData(tmpid: number) {
    
    this.deptservice.getMasterDepartmentById(tmpid).subscribe((res: Masterdept) => {
      console.log(res);
      this.userForm.patchValue({
        code: res.code,
        name: res.name,
        demandCode: res.demandCode,
        address: res.address,
        pinCode: res.pinCode,
        phoneNumber: res.phoneNumber,
        mobileNumber: res.mobileNumber,
        email: res.email
      });
      this.headertext = 'Edit Profile';
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    },
      error => {
        console.error('Error fetching department data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch department data by ID', life: 2000 });
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
    this.headertext = 'Add Department';
  }
  hide(form: FormGroup) {
    form.reset();
    this.isSubUp = true;
    this.visible = false;
    this.headertext = 'Add Department';
  }

  update(form: FormGroup) {
    if(this.userForm.valid){
    this.deptservice.updateMasterDepartmentById(this.id, this.userForm).subscribe((res: any) => {
      console.log(res);
      this.getData();
    });
    form.reset();
    this.isSubUp = true;
    this.visible = false;
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Updated', life: 2000 });
  }
  else{
    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Form Invalid', life: 2000 });

  }
}

  delData(tmpid: number) {
   
    this.deptservice.deleteMasterDepartmentById(tmpid).subscribe(() => {
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
