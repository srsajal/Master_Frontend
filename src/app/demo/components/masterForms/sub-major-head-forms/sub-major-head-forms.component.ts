import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubmajorheadService } from 'src/app/demo/service/MasterService/submajorhead.service';
import { Code, submajorhead } from 'src/Model/master.model';

@Component({
  selector: 'app-sub-major-head-forms',
  templateUrl: './sub-major-head-forms.component.html',
  styleUrls: ['./sub-major-head-forms.component.scss']
})
export class SubMajorHeadFormsComponent implements OnInit {

  id: number = 0;
  isDisable: boolean = false;
  // getTCode : string = '';
  formMaster?: submajorhead;

  codes: Code[] = [];
  userForm: FormGroup = new FormGroup({});
  dialogButts: number = 1;
  pgetData: () => void;


  fb = inject(FormBuilder);
  masterService = inject(SubmajorheadService);
  messageService = inject(MessageService);
  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef) {
    this.id = config.data.id;
    this.codes = config.data.code;
    this.isDisable = config.data.isDisable;
    this.dialogButts = config.data.dialogButt;
    this.pgetData = this.config.data.pgetData;

  }
  ngOnInit(): void {
    this.userForm = this.initializeMasterForm();
    if (this.dialogButts == 2 || this.dialogButts == 3) {
      this.getDataById();
    }
  }

  initializeMasterForm(isDisabled: boolean = false): FormGroup {
    const _newForm = this.fb.group({
      MajorHeadId: [{ value: this.formMaster?.majorHeadId ?? '', disabled: isDisabled }, Validators.required],
      Code: [{ value: this.formMaster?.code ?? '', disabled: isDisabled }, Validators.required],
      Name: [{ value: this.formMaster?.name ?? '', disabled: isDisabled }, Validators.required]

    });

    return _newForm;
  }
  submit() {
    if (this.userForm.valid) {
      this.masterService.postgetsubMajorHeadData(this.userForm).subscribe((res: number) => {
        if (res == 0) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This Major Head Id and Given Code is already exist in database', life: 2000 });
        }
        else {
          this.pgetData();
          this.ref.close();
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add MasterSubMajorHead  data', life: 2000 });
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
    this.masterService.getsubMajorHeadDataById(this.id).subscribe((res: submajorhead) => {
      this.formMaster = res;
      this.userForm = this.initializeMasterForm(this.isDisable);
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MasterSubMajorHead  data by ID', life: 2000 });
      }
    );
  }

  update() {
    if (this.userForm.valid) {
      this.masterService.updategetsubMajorHeadData(this.id, this.userForm).subscribe((res: submajorhead) => {
        this.pgetData();
        this.ref.close();
      },
      error => {
        console.error('Error adding MasterDDO data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add MasterSubMajorHead  data', life: 2000 });
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
  hide() {
    this.ref.close();
    this.dialogButts = 1;
  }

}
