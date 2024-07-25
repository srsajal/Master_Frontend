import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MastermajorheadService } from 'src/app/demo/service/MasterService/mastermajorhead.service';
import { Code, majorHead } from 'src/Model/master.model';

@Component({
  selector: 'app-master-majorhead-forms',
  templateUrl: './master-majorhead-forms.component.html',
  styleUrls: ['./master-majorhead-forms.component.scss']
})
export class MasterMajorheadFormsComponent implements OnInit {
  id: number = 0;
  isDisable: boolean = false;
  getTCode: string = '';
  formMaster?: majorHead;

  codes: Code[] = [];
  userForm: FormGroup = new FormGroup({});
  dialogButts: number = 1;
  pgetData: () => void;


  fb = inject(FormBuilder);
  masterService = inject(MastermajorheadService);
  messageService = inject(MessageService);
  isExist: any;
  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef) {
    this.id = config.data.id;
    this.codes = config.data.code;
    this.isDisable = config.data.isDisable;
    this.dialogButts = config.data.dialogButt;
    this.pgetData = this.config.data.pgetData;

  }
  getTcode() {
    this.getTCode = this.userForm.value.TreasuryCode;
  }

  ngOnInit(): void {

    this.userForm = this.initializeMasterForm();
    if (this.dialogButts == 2 || this.dialogButts == 3) {
      this.getDataById();
    }
  }

  initializeMasterForm(isDisabled: boolean = false): FormGroup {

    const _newForm = this.fb.group({

      Code: [{ value: this.formMaster?.code ?? '', disabled: isDisabled }, [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      Name: [{ value: this.formMaster?.name ?? '', disabled: isDisabled }, [, Validators.maxLength(100)]],

    });

    return _newForm;
  }
  submit() {
    if (this.userForm.valid) {
      if (this.isExist == false) {
        this.masterService.postData(this.userForm).subscribe((res: majorHead) => {
          this.pgetData();
          this.ref.close();
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
        },
          error => {
            // console.error('Error adding MasterMajorHead data:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add  MasterMajorHead data', life: 2000 });
            this.ref.close();
          }
        );
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The given code is already exist in database', life: 2000 });
      }

    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Error', detail: 'The form is invalid', life: 2000 });
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    }
  }

  getDataById() {
    this.masterService.getdatabyid(this.id).subscribe((res: majorHead) => {
      this.formMaster = res;
      this.userForm = this.initializeMasterForm(this.isDisable);
    },
      error => {
        console.error('Error fetching MasterMajorHead data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MasterMajorHead data by ID', life: 2000 });
      }
    );
  }

  update() {
    if (this.userForm.valid) {
      this.masterService.update(this.id, this.userForm).subscribe((res: majorHead) => {
        this.pgetData();
        this.ref.close();
      },
        error => {
          console.error('Error adding MasterMajorHead data:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add MasterMajorHead data', life: 2000 });
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
  onChangedata(event: any) {
    if (event.target.value == '') {
      this.isExist = true;
    }
    else {
      this.masterService.onChange(event.target.value).subscribe((res: any) => {
        this.isExist = res;
      });
    }
  }
}

