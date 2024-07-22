import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { MessageService } from 'primeng/api';
import { IapiResponce } from 'src/Model/iapi-responce';
import { MhPrimeDynamicTableModule } from 'mh-prime-dynamic-table';
import { MastermajorheadService } from '../../service/MasterService/mastermajorhead.service';
import { majorHead } from 'src/Model/master.model';
@Component({
  selector: 'app-majorhead',
  templateUrl: './majorhead.component.html',
  styleUrls: ['./majorhead.component.scss']
})
export class MajorheadComponent implements OnInit {
  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  alldata: number = 0;
  apiUrl = 'http://localhost:5271/api/masterMajorHead/'
  visible: boolean = false;
  id: number = 0;
  isExist !: boolean;
  isSubUp: boolean = true;
  headertext: string = 'Add MajorHeadData';
  majorHeadService = inject(MastermajorheadService)


  http = inject(HttpClient);
  messageService = inject(MessageService)
  constructor() { }

  userForm: FormGroup = new FormGroup({

    Code: new FormControl('', [Validators.required, Validators.maxLength(4)]),
    Name: new FormControl('', [Validators.required])

  });

  ngOnInit(): void {

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
    this.majorHeadService.getMHData(true,this.tableQueryParameters).subscribe((response: any) => {
      this.tableData = response.result;
      this.alldata = response.result.dataCount;
      console.log(this.tableData, response);
    });
  }

  submit(form: FormGroup) {
    if (this.userForm.valid && !this.isExist) {
      this.majorHeadService.postData(this.userForm).subscribe((res: majorHead) => {
        console.log(res);
        this.getData();
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
      }
      );
      form.reset();
      this.visible = false;
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Major Head data', life: 2000 });
    }
  }

  editData(tmpid: number) {
    this.majorHeadService.EditData(tmpid).subscribe((res: majorHead) => {
      console.log(res);
      this.userForm.patchValue({

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
    this.headertext = 'Edit MajorHeadData';
    this.visible = true;
    this.id = tmpid;
    this.isSubUp = false;
  }
  cancel(form: FormGroup) {
    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have Cancelled', life: 2000 });
    form.reset();
    this.isSubUp = true;
    this.visible = false;
    this.headertext = 'Add MajorHeadData';
  }
  hide(form: FormGroup) {
    form.reset();
    this.isSubUp = true;
    this.visible = false;
    this.headertext = 'Add MajorHeadData';
  }

  update(form: FormGroup) {
    if (this.userForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Form Update failed', life: 2000 });
    }
    else {
      this.majorHeadService.update(this.id, this.userForm).subscribe((res: majorHead) => {
        console.log(res);
        this.getData();
      });
      form.reset();
      this.isSubUp = true;
      this.visible = false;
      this.headertext = 'Add MajorHeadData';
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Updated', life: 2000 });
    }
  }

  delData(tmpid: number) {
    this.majorHeadService.delData(tmpid).subscribe(() => {
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

    this.visible = true;
  }

  handleRowSelection($event: majorHead) {
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
  chceckCode(event: any) {
    console.log("hello");
    console.log(event);

  }
  onChangedata(event: any) {
    if (event.target.value == '') {
      this.isExist = true;
    }
    else {
      this.majorHeadService.onChange(event.target.value).subscribe((res: any) => {
        this.isExist = res;
        console.log(res);

      });
    }
  }
}
