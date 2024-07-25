import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SchemeHeadServiceService } from 'src/app/demo/service/MasterService/master-schemehead.service';
import { Code, masterSchemeHead, minorheadid } from 'src/Model/master.model';

@Component({
  selector: 'app-master-scheme-head-forms',
  templateUrl: './master-scheme-head-forms.component.html',
  styleUrls: ['./master-scheme-head-forms.component.scss']
})
export class MasterSchemeHeadFormsComponent implements OnInit {

  visible : boolean = false;
  id : number = 0;
  isDisable : boolean = false;
  getTCode : string = '';
  formMaster?: masterSchemeHead;
  isSubUp : boolean = true;
  codes: Code[] = [];
  userForm: FormGroup = new FormGroup({});
  dialogButts: number = 1;
  pgetData:() => void;

  http = inject(HttpClient);

  fb = inject(FormBuilder);
  masterService = inject(SchemeHeadServiceService);
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
  showDialog() {
    // console.log("showdialog called");
    this.visible = true;
  }


  initializeMasterForm(isDisabled: boolean = false): FormGroup {
    // console.log(this.theRegistration);
    const _newForm = this.fb.group({
      demandCode: [{ value: this.formMaster?.demandCode ?? '', disabled: isDisabled }, Validators.required],
     // DistrictCode: [{ value: this.formMaster?.districtCode ?? '', disabled: isDisabled }, ],
      code: [{ value: this.formMaster?.code ?? '', disabled: isDisabled }, Validators.required,Validators.minLength(3)],
      name: [{ value: this.formMaster?.name ?? '', disabled: isDisabled }, Validators.required],
      minorHeadId: [{ value: this.formMaster?.minorHeadId ?? '', disabled: isDisabled }, ],
    });

    return _newForm;
  }

  getDataById() {
    this.masterService.GetMasterSCHEME_HEADById(this.id).subscribe((res: masterSchemeHead) => {
      this.formMaster = res;
      this.userForm = this.initializeMasterForm(this.isDisable);
      // console.log(res, this,this.dialogButts);
    },
      error => {
        console.error('Error fetching MasterSchemeHead data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MasterScehemeHead data by ID', life: 2000 });
      }
    );
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
  submit(){
    console.log(this.userForm.value);
    if(this.userForm.valid){
    const data =this.userForm.value
    this.http.post<masterSchemeHead>( 'http://localhost:5271/api/masterSCHEME_HEAD/AddmasterSCHEME-HEAD', data)
      .subscribe(
        (res:any) => {
          console.log(res);
          this.pgetData();
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
        },
        (error: any) => {
          console.error('Error submitting form:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to submit form', life: 2000 });
        }
      );}
      else{
        this.messageService.add({ severity: 'warn', summary: 'warn', detail: 'Invalid Form', life: 2000 });}
   this. userForm.reset();
    this.visible=false;
  }
  update(){
    if(this.userForm.valid){
      this.masterService.updatemasterSCHEME_HEAD(this.id, this.userForm).subscribe((res : any) =>{
        console.log(res);
        this.pgetData();
      });
    }
 
    this.userForm.reset();
    this.isSubUp = true;
    this.visible = false;
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Updated', life: 2000 });
  
  }
  
  getCodeFromMinorhead() {
    this.http.get<minorheadid[]>('http://localhost:5271/api/masterSCHEME_HEAD/GetMasterSCHEME_HEADfromMINORHEADId').subscribe({
      next: (res: minorheadid[]) => {
        this.codes = res;
        console.log(res);

      },
      error: (error) => {
        console.error('Error fetching codes from MinorHead:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch codes from MinorHead', life: 2000 });
      }
    });
  }
}
