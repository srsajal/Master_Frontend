import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DepartmentServiceService } from 'src/app/demo/service/MasterService/department-service.service';
import { Code, Masterdept } from 'src/Model/master.model';

@Component({
  selector: 'app-departmentforms',
  templateUrl: './departmentforms.component.html',
  styleUrls: ['./departmentforms.component.scss']
})
export class DepartmentformsComponent implements OnInit {

  id : number = 0;
  isDisable : boolean = false;
  getTCode : string = '';
  formMaster?: Masterdept;
  
  codes: Code[] = [];
  userForm: FormGroup = new FormGroup({});
  dialogButts: number = 1;
  pgetData:() => void;


  fb = inject(FormBuilder);
  masterService = inject(DepartmentServiceService);
  messageService = inject(MessageService);
  isExist: boolean | undefined;
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
    const _newForm = this.fb.group({
      Code: [{ value: this.formMaster?.code ?? '', disabled: isDisabled }, [Validators.required,Validators.maxLength(2),Validators.minLength(2)]],
      Name: [{ value: this.formMaster?.name ?? '', disabled: isDisabled },[,Validators.maxLength(100),,Validators.minLength(2)]],
      DemandCode: [{ value: this.formMaster?.demandCode ?? '', disabled: isDisabled }, [Validators.required,Validators.minLength(1),Validators.maxLength(2)]],
      Address: [{ value: this.formMaster?.address ?? '', disabled: isDisabled }, [Validators.required,Validators.minLength(3)]],
      PinCode: [{ value: this.formMaster?.pinCode ?? '', disabled: isDisabled }, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")]],
      PhoneNumber: [{ value: this.formMaster?.phoneNumber ? this.formMaster?.phoneNumber.trim() : '', disabled: isDisabled },[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.required]],
      //PhoneNumber: [{ value: this.formMaster?.phoneNumber ?? '', disabled: isDisabled },[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.required]],
      MobileNumber: [{ value: this.formMaster?.mobileNumber ?? '', disabled: isDisabled },[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.required]],
      Email: [{ value: this.formMaster?.email ?? '', disabled: isDisabled }, [Validators.email,Validators.required]],
      
    });

    return _newForm;
  }
  submit() {
    if (this.userForm.valid) {
      if(this.isExist == false){
      this.masterService.postMasterDepartment(this.userForm).subscribe((res: Masterdept) => {
        console.log(res);
        this.pgetData();
        this.ref.close();
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Form Submitted', life: 2000 });
      },
      error => {
        console.error('Error adding MasterDepartment data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Master Department data', life: 2000 });
        this.ref.close();
      }
    );
  }
  else{
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This Demand code already exist in database', life: 2000 });
  }
      // form.reset();
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Error', detail: 'The form is invalid', life: 2000 });
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    }
  }

  getDataById() {
    this.masterService.getMasterDepartmentById(this.id).subscribe((res: Masterdept) => {
      this.formMaster = res;
      this.userForm = this.initializeMasterForm(this.isDisable);
      // console.log(res, this,this.dialogButts);
    },
      error => {
        console.error('Error fetching MasterDepartment data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MasterDepartment data by ID', life: 2000 });
      }
    );
  }
  
  update() {
    if (this.userForm.valid) {
      this.masterService.updateMasterDepartmentById(this.id, this.userForm).subscribe((res: Masterdept) => {
        console.log(res);
        this.pgetData();
        this.ref.close();
      },
      error => {
        console.error('Error adding MasterDepartment data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Master Department data', life: 2000 });
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
  onChangedata(event: any) {
    if (event.target.value == '') {

      this.isExist = true;
    }
    else {
      this.masterService.onChange(event.target.value).subscribe((res: any) => {
        this.isExist = res;
        // console.log(res);

      });
    }}

}
