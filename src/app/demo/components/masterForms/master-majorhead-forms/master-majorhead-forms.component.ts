import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MastermajorheadService } from 'src/app/demo/service/MasterService/mastermajorhead.service';
import { majorHead } from 'src/Model/master.model';

@Component({
  selector: 'app-master-majorhead-forms',
  templateUrl: './master-majorhead-forms.component.html',
  styleUrls: ['./master-majorhead-forms.component.scss']
})
export class MasterMajorheadFormsComponent implements OnInit {
  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  istableLoading:boolean = false;
  alldata: number = 0;
 // apiUrl = 'http://localhost:5271/api/masterMajorHead/'
  visible: boolean = false;
  id: number = 0;
  isExist !: boolean;
  isSubUp: boolean = true;
  headertext: string = 'Add MajorHeadData';
  majorHeadService = inject(MastermajorheadService)
  pgetData:(() => void) ;
  userForm: FormGroup = new FormGroup({});
  http = inject(HttpClient);
  messageService = inject(MessageService)
  fb = inject(FormBuilder);
  formMaster?: majorHead;
  initializeMasterForm(isDisabled: boolean = false): FormGroup {
    // console.log(this.theRegistration);
    const _newForm = this.fb.group({
     // TreasuryCode: [{ value: this.formMaster?.treasuryCode ?? '', disabled: isDisabled }, Validators.required],
      Code: [{ value: this.formMaster?.code ?? '', disabled: isDisabled }, Validators.required],
     // Designation: [{ value: this.formMaster?.designation ?? '', disabled: isDisabled }, Validators.required],
      Name: [{ value: this.formMaster?.name ?? '', disabled: isDisabled }, Validators.required],
     // Phone: [{ value: this.formMaster?.phone ?? '', disabled: isDisabled }, [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

    return _newForm;
  }
  constructor(public config : DynamicDialogConfig, public ref : DynamicDialogRef) {    this.pgetData = this.config.data.pgetData; }

  ngOnInit(): void {
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
        this.pgetData();
      });
      form.reset();
      this.isSubUp = true;
      this.visible = false;
      this.headertext = 'Add MajorHeadData';
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Updated', life: 2000 });
    }
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
  submit(form: FormGroup) {
    if (this.userForm.valid && !this.isExist) {
      this.majorHeadService.postData(this.userForm).subscribe((res: majorHead) => {
        console.log(res);
        this.pgetData();
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
}
