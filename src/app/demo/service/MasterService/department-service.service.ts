import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IapiResponce } from 'src/Model/iapi-responce';
import { Code, MasterDdo, Masterdept } from 'src/Model/master.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {

    departmenturl = environment.BaseURL + 'MasterDepartment/';
  http = inject(HttpClient);

  constructor() { }

  getMasterDepartment(tableQueryParameters: DynamicTableQueryParameters | any) : Observable<IapiResponce> {
    return this.http.post<IapiResponce<DynamicTable<Masterdept>>>(this.departmenturl + 'GetMasterDepartment', tableQueryParameters)
  }

  postMasterDepartment(userForm: FormGroup) {
    return this.http.post<Masterdept>(this.departmenturl + 'AddMasterDepartment', userForm.value)
  }

  getMasterDepartmentById(tmpid: number) {
    return this.http.get<Masterdept>(this.departmenturl + 'GetMasterDepartmentById?id=' + `${tmpid}`)
  }

  updateMasterDepartmentById(tmpid: number, userForm: FormGroup):Observable<Masterdept> {
    return this.http.put<Masterdept>(this.departmenturl + 'UpdateMasterDepartment?id=' + `${tmpid}`, userForm.value)
  }
  deleteMasterDepartmentById(tmpid : number){
    return  this.http.delete(this.departmenturl + 'DeleteMasterDepartment?id=' + `${tmpid}`)
  }
  }