import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MinorheadService } from 'src/app/demo/service/MasterService/minorhead.service';
import { Code, minorHead } from 'src/Model/master.model';

@Component({
  selector: 'app-master-minorhead-forms',
  templateUrl: './master-minorhead-forms.component.html',
  styleUrls: ['./master-minorhead-forms.component.scss']
})
export class MasterMinorheadFormsComponent implements OnInit {

  id : number = 0;
  isDisable : boolean = false;
  getTCode : string = '';
  formMaster?: minorHead;
  
  codes: Code[] = [];
  userForm: FormGroup = new FormGroup({});
  dialogButts: number = 1;
  pgetData:() => void;


  fb = inject(FormBuilder);
  masterService = inject(MinorheadService);
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
    this.userForm = this.initializeMasterForm();
    if(this.dialogButts == 2 || this.dialogButts == 3)
    {
      this.getDataById();
    }
  }

  initializeMasterForm(isDisabled: boolean = false): FormGroup {
    const _newForm = this.fb.group({
      SubMajorId: [{ value: this.formMaster?.subMajorId ?? '', disabled: isDisabled }, Validators.required],
      Code: [{ value: this.formMaster?.code ?? '', disabled: isDisabled }, Validators.required],
      Name: [{ value: this.formMaster?.name ?? '', disabled: isDisabled }, Validators.required]
     
    });

    return _newForm;
  }
  submit() {
    if (this.userForm.valid) {
      this.masterService.postMasterMinorhead(this.userForm).subscribe((res: minorHead) => {
        this.pgetData();
        this.ref.close();
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Master DDO data', life: 2000 });
        this.ref.close();
      }
    );
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Error', detail: 'The form is invalid', life: 2000 });
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    }
  }

  getDataById() {
    this.masterService.getMasterMinorheadById(this.id).subscribe((res: minorHead) => {
      this.formMaster = res;
      this.userForm = this.initializeMasterForm(this.isDisable);
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MasterDDO data by ID', life: 2000 });
      }
    );
  }
  
  update() {
    if (this.userForm.valid) {
      this.masterService.updateMasterMinorheadById(this.id, this.userForm).subscribe((res: minorHead) => {
        this.pgetData();
        this.ref.close();
      },
      error => {
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
