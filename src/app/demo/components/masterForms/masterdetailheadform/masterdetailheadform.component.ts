import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetailheadService } from 'src/app/demo/service/MasterService/detailhead.service';
import { Code, MasterDetailHead } from 'src/Model/master.model';

@Component({
  selector: 'app-masterdetailheadform',
  templateUrl: './masterdetailheadform.component.html',
  styleUrls: ['./masterdetailheadform.component.scss']
})
export class MasterdetailheadformComponent implements OnInit {
 
  id : number = 0;
  isDisable : boolean = false;
  //getTCode : string = '';
  formMaster?: MasterDetailHead;
  
  codes: Code[] = [];
  userForm: FormGroup = new FormGroup({});
  dialogButts: number = 1;
  pgetData:() => void;

  fb = inject(FormBuilder);
  detailHeadService = inject(DetailheadService);
  messageService = inject(MessageService);
  constructor(public config : DynamicDialogConfig, public ref : DynamicDialogRef) {
    this.id = config.data.id;
    this.codes = config.data.code;
    this.isDisable = config.data.isDisable;
    this.dialogButts = config.data.dialogButt;
    this.pgetData = this.config.data.pgetData;
    
   }

  ngOnInit(): void {
    this.userForm = this.initializeMasterForm();
    if(this.dialogButts == 2 || this.dialogButts == 3)
    {
      this.getDataById();
    }
  }

  initializeMasterForm(isDisabled: boolean = false): FormGroup {
    // console.log(this.theRegistration);
    const _newForm = this.fb.group({
     
      Code: [{ value: this.formMaster?.code ?? '', disabled: isDisabled }, [Validators.required, Validators.maxLength(2)]],
      Name: [{ value: this.formMaster?.name ?? '', disabled: isDisabled }, Validators.required],
      
    });

    return _newForm;
  }

  submit() {
    if (this.userForm.valid) {
      this.detailHeadService.postMasterDetailHead(this.userForm).subscribe((res: MasterDetailHead) => {
        console.log(res);
        this.pgetData();
        this.ref.close();
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Master Detail Head data', life: 2000 });
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
    this.detailHeadService.getMasterDetailHeadById(this.id).subscribe((res: MasterDetailHead) => {
      this.formMaster = res;
      this.userForm = this.initializeMasterForm(this.isDisable);
      // console.log(res, this,this.dialogButts);
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch Master Detail Head data by ID', life: 2000 });
      }
    );
  }

  update() {
    if (this.userForm.valid) {
      this.detailHeadService.updateMasterDetailHeadById(this.id, this.userForm).subscribe((res: MasterDetailHead) => {
        console.log(res);
        this.pgetData();
        this.ref.close();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Master Detail Head data', life: 2000 });
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
