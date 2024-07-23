import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IapiResponce } from 'src/Model/iapi-responce';
import { MasterDetailHead, MasterSubDetailHead } from 'src/Model/master.model';

@Injectable({
  providedIn: 'root'
})
export class SubdetailheadService {
  ddourl = environment.BaseURL + 'masterSubDetailHead/';
  http = inject(HttpClient);

  constructor() { }

  getMasterSubDetailHead(isActive:boolean, tableQueryParameters: DynamicTableQueryParameters | any) : Observable<IapiResponce> {
    return this.http.post<IapiResponce<DynamicTable<MasterSubDetailHead>>>(this.ddourl + 'GetMasterSubDetailHead?isActive='+isActive, tableQueryParameters)
  }

  getDetailHeadCode(){
    return this.http.get<MasterDetailHead[]>(this.ddourl + 'GetDetailCode')
  }

  postMasterSubDetailHead(userForm: FormGroup) {
    return this.http.post<MasterSubDetailHead>(this.ddourl + 'AddMasterSubDetailHead', userForm.value)
  }

  getMasterSubDetailHeadById(tmpid: number) {
    return this.http.get<MasterSubDetailHead>(this.ddourl + 'GetMasterSubDetailHeadById?id=' + `${tmpid}`)
  }

  updateMasterSubDetailHeadById(tmpid: number, userForm: FormGroup) {
    return this.http.put<MasterSubDetailHead>(this.ddourl + 'UpdateMasterSubDetailHead?id=' + `${tmpid}`, userForm.value)
  }
  deleteMasterSubDetailHeadById(tmpid : number){
    return  this.http.delete(this.ddourl + 'DeleteMasterSubDetailHead?id=' + `${tmpid}`)
  }
  countMasterSubDetailHead(isActive:boolean, tableQueryParameters: DynamicTableQueryParameters | any){
    return this.http.post<IapiResponce<DynamicTable<MasterSubDetailHead>>>(this.ddourl + 'CountMasterSubDetailHead?isActive='+isActive, tableQueryParameters)
  }

}
