import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { log } from 'console';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { MenuItem, MessageService } from 'primeng/api';
import { IapiResponce } from 'src/Model/iapi-responce';
import { majorHead, MasterDetailHead } from 'src/Model/master.model';

@Component({
  selector: 'app-submajorhead',
  templateUrl: './submajorhead.component.html',
  styleUrls: ['./submajorhead.component.scss']
})
export class SubmajorheadComponent implements OnInit {

  tableData: any;
  istableLoading:boolean = false;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  alldata : number = 0;
  apiUrl = 'http://localhost:5271/api/masterSubMajorHead/'
  aurl = 'http://localhost:5271/api/masterSubMajorHead/'

  visible : boolean = false;
  id : number = 0;
  codes: MasterDetailHead[] = [];
  isSubUp : boolean = true;
  headertext:string = 'ADD SubMajorHead';
  items: MenuItem[];
  home: MenuItem;
  

  http = inject(HttpClient);
  messageService = inject(MessageService)
  constructor() {
    this.items = [
      { label: 'Master Management' },
      { label: 'Sub Major Head' },
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
   }

  userForm: FormGroup = new FormGroup({
    majorheadcode: new FormControl('', Validators.required),
    Code: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    Name: new FormControl('',[Validators.required]),
  });

  ngOnInit(): void {
    this.getmajorHeadcode();
    this.actionButtonConfig = [
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
    this.istableLoading=true;
    this.http
      .post<IapiResponce<DynamicTable<any>>>(this.apiUrl + 'GetMastersubmajorhead', this.tableQueryParameters)
      .subscribe((response: any) => {
        this.istableLoading=false;
        this.tableData = response.result;
        this.alldata = response.result.dataCount;
        console.log(this.tableData, response);
         

      });
  }

  getmajorHeadcode() {
    this.http
      .get<MasterDetailHead[]>(this.aurl + 'GetMajorHeadcode', )
      .subscribe((res: MasterDetailHead[]) => {
        console.log(res);
        
        this.codes = res;
      },
        error => {
          console.error('Error fetching codes from Treasury:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch codes from Treasury', life: 2000 });
        }
      );
  }

  submit(form : FormGroup){

    console.log(this.codes);
    console.log(this.userForm.value);
    
    if(this.userForm.invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Master DDO data', life: 2000 });
    }
    else {
    this.http.post<any>(this.apiUrl + 'AddMasterSubmajorHead', this.userForm.value).subscribe((res : any) =>{
      console.log(res);
      this.getData();
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
    }
    // error => {
    //   console.error('Error adding MasterDDO data:', error);
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Master DDO data', life: 2000 });
    
    // }
  );
    form.reset();
    this.visible=false;
 }
  }

  editData(tmpid: number) {
    this.http.get<any>(this.apiUrl + 'GetMasterMastersubMajorHeadById?id=' + `${tmpid}`).subscribe((res:any) => {
      console.log(res);
      this.userForm.patchValue({
        majorheadcode:res.majorheadcode,
        Code: res.code,
        Name: res.name,
       
        
      });
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    },
      error => {
        console.error('Error fetching student data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch student data by ID', life: 2000 });
      }
    );
    this.headertext = 'Edit DDO';
    this.visible = true;
    this.id = tmpid;
    this.isSubUp = false;
  }
  
  cancel(form: FormGroup) {
    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have Cancelled', life: 2000 });
    form.reset();
    this.isSubUp = true;
    this.visible = false;
    this.headertext = 'Add DDO';
  }
  hide(form: FormGroup) {
    form.reset();
    this.isSubUp = true;
    this.visible = false;
    this.headertext = 'Add DDO';
  }

  update(form : FormGroup){
    if(this.userForm.invalid){
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Form Update failed', life: 2000 });
    }
    else{
    this.http.put<any>(this.apiUrl + 'UpdateMastersubMajorHead?id=' + `${this.id}` , this.userForm.value).subscribe((res : any) =>{
      console.log(res);
      this.getData();
    });
    form.reset();
    this.isSubUp = true;
    this.visible = false;
    this.headertext = 'Add DDO';
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Updated', life: 2000 });
  }
}

  delData(tmpid: number) {
    this.http.delete(this.apiUrl + 'DeleteMasterMAJORHEAD?id=' + `${tmpid}`).subscribe(() => {
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
