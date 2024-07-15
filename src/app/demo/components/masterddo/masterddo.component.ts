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
  dialogButts: number = 1;
  headertext: string = 'ADD DDO DATA';
  codes: Code[] = [];
  formMaster?: MasterDdo;
  fb = inject(FormBuilder);

  http = inject(HttpClient);
  messageService = inject(MessageService);
  masterService = inject(MasterService);
  constructor() { }

  userForm: FormGroup = new FormGroup({});

  // userForm: FormGroup = new FormGroup({
  //   TreasuryCode: new FormControl('', [Validators.required, Validators.maxLength(3)]),
  //   Code: new FormControl('', Validators.required),
  //   Designation: new FormControl('', Validators.required),
  //   Address: new FormControl(''),
  //   Phone: new FormControl('', [Validators.required, Validators.maxLength(15)])
  // });

  ngOnInit():void {
    this.userForm.reset();
    this.userForm = this.initializeMasterForm();
    this.tableInitialize();
    this.getData();
    this.getCodeFromTreasury();
    console.log("table reloaded");
   
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
      console.log(this.tableData, response);
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

  submit(form: FormGroup) {

    this.masterService.postMasterDDO(this.userForm).subscribe((res: MasterDdo) => {
      console.log(res);
      this.getData();
    });
    form.reset();
    this.visible = false;
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
    this.ngOnInit();
  }

  editData(tmpid: number) {
    this.masterService.getMasterDDOById(tmpid).subscribe((res: MasterDdo) => {
      // this.userForm.patchValue({
      //   TreasuryCode: res.treasuryCode,
      //   Code: res.code,
      //   Designation: res.designation,
      //   Address: res.address,
      //   Phone: res.phone
      // });
      // console.log(res);
      this.formMaster = res;
      this.userForm = this.initializeMasterForm();
      console.log(this.userForm);
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    },
      error => {
        console.error('Error fetching MasterDDO data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MasterDDO data by ID', life: 2000 });
      }
    );
    this.headertext = 'EDIT DDO DATA';
    this.visible = true;
    this.id = tmpid;
    this.dialogButts = 2;
  }
  cancel(form: FormGroup) {
    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have Cancelled', life: 2000 });
    form.reset();
    this.dialogButts = 1;
    this.visible = false;
    this.headertext = 'ADD DDO DATA';
    this.ngOnInit();
  }
  hide(form: FormGroup) {
    // this.formMaster = undefined;
    // this.userForm = this.initializeMasterForm(false);
    form.reset();
    this.dialogButts = 1;
    this.visible = false;
    this.headertext = 'ADD DDO DATA';
    this.ngOnInit();
    console.log("test");
    
  }

  update(form: FormGroup) {
    this.masterService.updateMasterDDOById(this.id, this.userForm).subscribe((res: MasterDdo) => {
      console.log(res);
      this.getData();
    });
    form.reset();
    this.dialogButts = 1;
    this.visible = false;
    this.headertext = 'ADD DDO DATA';
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Updated', life: 2000 });
  }

  delData(tmpid: number) {
   this.masterService.deleteMasterDDOById(tmpid).subscribe(() => {
      this.getData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 2000 });
    },
      error => {
        console.error('Error deleting MasterDDO data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to MasterDDO record', life: 2000 });
      }
    );
  }

  viewData(tmpid : number){
    this.masterService.getMasterDDOById(tmpid).subscribe((res: MasterDdo) => {
     
      this.formMaster = res;
      this.userForm = this.initializeMasterForm(true);
      console.log(this.userForm);
      

      //this.userForm.markAllAsTouched();
      //this.userForm.markAsDirty();
    },
      error => {
        console.error('Error fetching MasterDDO data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MasterDDO data by ID', life: 2000 });
      }
    );
    this.headertext = 'VIEW DDO DATA';
    this.visible = true;
    this.id = tmpid;
    this.dialogButts = 3;
  }

  initializeMasterForm(isDisabled: boolean = false): FormGroup {
    // console.log(this.theRegistration);
    const _newForm = this.fb.group({
      TreasuryCode: [{ value: this.formMaster?.treasuryCode?? '', disabled: isDisabled },Validators.required],
      Code: [{ value: this.formMaster?.code?? '', disabled: isDisabled }, Validators.required],
      Designation: [{ value: this.formMaster?.designation?? '', disabled: isDisabled }, Validators.required],
      Address: [{ value: this.formMaster?.address?? '', disabled: isDisabled }, Validators.required],
      Phone: [{ value: this.formMaster?.phone?? '', disabled: isDisabled }, Validators.required]
    });

    return _newForm;
  }

  showDialog() {
    // console.log("showdialog called");
    this.visible = true;
    this.userForm.reset();
    this.userForm = this.initializeMasterForm(false);
    console.log(this.userForm);
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
}
