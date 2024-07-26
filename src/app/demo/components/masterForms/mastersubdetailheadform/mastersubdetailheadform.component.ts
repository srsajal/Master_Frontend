import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubdetailheadService } from 'src/app/demo/service/MasterService/subdetailhead.service';
import { MasterDetailHead, MasterSubDetailHead } from 'src/Model/master.model';

@Component({
  selector: 'app-mastersubdetailheadform',
  templateUrl: './mastersubdetailheadform.component.html',
  styleUrls: ['./mastersubdetailheadform.component.scss']
})
export class MastersubdetailheadformComponent implements OnInit {
  id : number = 0;
  isDisable : boolean = false;
  formMaster?: MasterSubDetailHead;
  
  codes: MasterDetailHead[] = [];
  userForm: FormGroup = new FormGroup({});
  dialogButts: number = 1;
  pgetData:() => void;

  fb = inject(FormBuilder);
  subDetailHeadService = inject(SubdetailheadService);
  messageService = inject(MessageService);
  constructor(public config : DynamicDialogConfig, public ref : DynamicDialogRef) {
    this.id = config.data.id;
    this.codes = config.data.code;
    this.isDisable = config.data.isDisable;
    this.dialogButts = config.data.dialogButt;
    this.pgetData = this.config.data.pgetData;
    console.log(this.codes);
    
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
      DetailHeadId : [{ value: this.formMaster?.detailHeadId ?? '', disabled: isDisabled }, Validators.required],
      Code: [{ value: this.formMaster?.code ?? '', disabled: isDisabled }, [Validators.required, Validators.maxLength(2)]],
      Name: [{ value: this.formMaster?.name ?? '', disabled: isDisabled }, Validators.required],
      
    });

    return _newForm;
  }

  submit() {
    if (this.userForm.valid) {
      this.subDetailHeadService.postMasterSubDetailHead(this.userForm).subscribe((res: MasterSubDetailHead) => {
        this.pgetData();
        this.ref.close();
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Master Sub Detail Head data', life: 2000 });
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
    this.subDetailHeadService.getMasterSubDetailHeadById(this.id).subscribe((res: MasterSubDetailHead) => {
      console.log(res);      
      this.formMaster = res;
      this.userForm = this.initializeMasterForm(this.isDisable);
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch Master Sub Detail Head data by ID', life: 2000 });
      }
    );
  }

  update() {
    if (this.userForm.valid) {
      this.subDetailHeadService.updateMasterSubDetailHeadById(this.id, this.userForm).subscribe((res: MasterSubDetailHead) => {
        console.log(res);
        this.pgetData();
        this.ref.close();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Master Sub Detail Head data', life: 2000 });
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
