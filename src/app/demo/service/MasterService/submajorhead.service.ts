import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IapiResponce } from 'src/Model/iapi-responce';
import { MasterDetailHead, submajorhead } from 'src/Model/master.model';


@Injectable({
  providedIn: 'root'
})
export class SubmajorheadService {
  submajorheadurl = environment.BaseURL + 'masterSubMajorHead/';
  http = inject(HttpClient);


  constructor() { }
  getsubmajorheadData(isActive:boolean,tableQueryParameters: DynamicTableQueryParameters | any) : Observable<IapiResponce> {
    return this.http.post<IapiResponce<DynamicTable<submajorhead>>>(this.submajorheadurl + 'GetMastersubmajorhead?isActive='+ isActive, tableQueryParameters)
  }
  postData(userForm : FormGroup){
    return  this.http.post<submajorhead>(this.submajorheadurl + 'AddMasterSubmajorHead', userForm.value)
  }
  EditData(tmpid: number) {
    return this.http.get<submajorhead>(this.submajorheadurl + 'GetMasterMastersubMajorHeadById?id=' + `${tmpid}`)
  }
  update(id: number,userForm : FormGroup){
  return this.http.put<submajorhead>(this.submajorheadurl + 'UpdateMastersubMajorHead?id=' + `${id}` , userForm.value)
  }
  delData(tmpid: number) {
    return this.http.delete(this.submajorheadurl + 'DeleteMasterMAJORHEAD?id=' + `${tmpid}`)
  }
  getsubmajorheadcode(){
    return this.http.get<MasterDetailHead[]>(this.submajorheadurl + 'GetMajorHeadcode', )

  }
}
