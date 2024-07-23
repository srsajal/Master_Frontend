import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MasterTreasuryService } from 'src/app/demo/service/MasterService/master-treasury.service';
import { Code, MasterTreasury } from 'src/Model/master.model';

@Component({
  selector: 'app-master-treasury-forms',
  templateUrl: './master-treasury-forms.component.html',
  styleUrls: ['./master-treasury-forms.component.scss']
})
export class MasterTreasuryFormsComponent implements OnInit {

  id : number = 0;
  isDisable : boolean = false;
  getTCode : string = '';
  formMaster?: MasterTreasury;
  
  codes: Code[] = [];
  userForm: FormGroup = new FormGroup({});
  dialogButts: number = 1;
  pgetData:() => void;


  fb = inject(FormBuilder);
  masterService = inject(MasterTreasuryService);
  messageService = inject(MessageService);
  constructor(public config : DynamicDialogConfig, public ref : DynamicDialogRef) {
    this.id = config.data.id;
    this.codes = config.data.code;
    this.isDisable = config.data.isDisable;
    this.dialogButts = config.data.dialogButt;
    this.pgetData = this.config.data.pgetData;
    
   }
  getTcode(){
    this.getTCode = this.userForm.value.TreasuryCode;
  }

  ngOnInit(): void {
    // console.log(this.id, this.isDisable, this.dialogButts);
    this.userForm = this.initializeMasterForm();
    if(this.dialogButts == 2 || this.dialogButts == 3)
    {
      this.getDataById();
    }
  }

  initializeMasterForm(isDisabled: boolean = false): FormGroup {
    // console.log(this.theRegistration);
    const _newForm = this.fb.group({
      DistrictName: [{ value: this.formMaster?.districtName ?? '', disabled: isDisabled }, Validators.required],
      DistrictCode: [{ value: this.formMaster?.districtCode ?? '', disabled: isDisabled }, ],
      Code: [{ value: this.formMaster?.code ?? '', disabled: isDisabled }, Validators.required],
      Name: [{ value: this.formMaster?.name ?? '', disabled: isDisabled }, Validators.required]
      
    });

    return _newForm;
  }
  submit() {
    if (this.userForm.valid) {
      this.masterService.postMasterTreasury(this.userForm).subscribe((res: MasterTreasury) => {
        console.log(res);
        this.pgetData();
        this.ref.close();
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
      },
      error => {
        console.error('Error adding MasterDDO data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Master DDO data', life: 2000 });
        this.ref.close();
      }
    );
      // form.reset();
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Error', detail: 'The form is invalid', life: 2000 });
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    }
  }

  getDataById() {
    this.masterService.getMasterTreasuryById(this.id).subscribe((res: MasterTreasury) => {
      this.formMaster = res;
      this.userForm = this.initializeMasterForm(this.isDisable);
      // console.log(res, this,this.dialogButts);
    },
      error => {
        console.error('Error fetching MasterDDO data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MasterDDO data by ID', life: 2000 });
      }
    );
  }
  
  update() {
    if (this.userForm.valid) {
      this.masterService.updateMasterTreasuryById(this.id, this.userForm).subscribe((res: MasterTreasury) => {
        console.log(res);
        this.pgetData();
        this.ref.close();
      },
      error => {
        console.error('Error adding MasterDDO data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Master DDO data', life: 2000 });
        this.ref.close();
      }    
    );
      this.dialogButts = 1;
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Updated', life: 2000 });
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Error', detail: 'The form is invalid', life: 2000 });
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    }
  }

  
  cancel() {
    this.ref.close();
    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have Cancelled', life: 2000 });
    this.dialogButts = 1;
  }
  hide(){
    this.ref.close();
    this.dialogButts = 1;
  }

}
