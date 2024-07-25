import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Code, MasterDdo } from 'src/Model/master.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MasterService } from 'src/app/demo/service/MasterService/masterddo.service';

@Component({
  selector: 'app-masterddoforms',
  templateUrl: './masterddoforms.component.html',
  styleUrls: ['./masterddoforms.component.scss']
})
export class MasterddoformsComponent implements OnInit {
  id : number = 0;
  isDisable : boolean = false;
  getTCode : string = '';
  formMaster?: MasterDdo;
  
  codes: Code[] = [];
  userForm: FormGroup = new FormGroup({});
  dialogButts: number = 1;
  pgetData:() => void;


  fb = inject(FormBuilder);
  masterService = inject(MasterService);
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
      TreasuryCode: [{ value: this.formMaster?.treasuryCode ?? '', disabled: isDisabled }, Validators.required],
      Code: [{ value: this.formMaster?.code ?? '', disabled: isDisabled }, Validators.required],
      Designation: [{ value: this.formMaster?.designation ?? '', disabled: isDisabled }, Validators.required],
      Address: [{ value: this.formMaster?.address ?? '', disabled: isDisabled }, Validators.required],
      Phone: [{ value: this.formMaster?.phone ?? '', disabled: isDisabled }, [Validators.required, Validators.pattern('^[0-9]{10}$')]]
      // Phone: [{ value: this.formMaster?.phone.trim() ?? '', disabled: isDisabled }, [Validators.required, Validators.pattern('^[0-9]{10}$')]]
      // Phone: [{ value: this.formMaster?.phone ? this.formMaster.phone.trim() : '', disabled: isDisabled }, 
      //   [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

    return _newForm;
  }
  submit() {
    if (this.userForm.valid) {
      this.masterService.postMasterDDO(this.userForm).subscribe((res: MasterDdo) => {
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
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Error', detail: 'The form is invalid', life: 2000 });
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    }
  }

  getDataById() {
    this.masterService.getMasterDDOById(this.id).subscribe((res: MasterDdo) => {
      this.formMaster = res;
      this.userForm = this.initializeMasterForm(this.isDisable);
    },
      error => {
        console.error('Error fetching MasterDDO data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MasterDDO data by ID', life: 2000 });
      }
    );
  }
  
  update() {
    if (this.userForm.valid) {
      this.masterService.updateMasterDDOById(this.id, this.userForm).subscribe((res: MasterDdo) => {
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
