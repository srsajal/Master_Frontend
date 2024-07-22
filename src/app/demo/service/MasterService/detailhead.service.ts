import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IapiResponce } from 'src/Model/iapi-responce';
import { MasterDetailHead } from 'src/Model/master.model';

@Injectable({
  providedIn: 'root'
})
export class DetailheadService {
  ddourl = environment.BaseURL + 'masterDetailHead/';
  http = inject(HttpClient);

  constructor() { }

  getMasterDetailHead(isActive:boolean, tableQueryParameters: DynamicTableQueryParameters | any) : Observable<IapiResponce> {
    return this.http.post<IapiResponce<DynamicTable<MasterDetailHead>>>(this.ddourl + 'GetMasterDetailHead?isActive='+isActive, tableQueryParameters)
  }

  // getMasterCodeTreasury(){
  //   return this.http.get<Code[]>(this.ddourl + 'GetTreasuryCode')
  // }

  postMasterDetailHead(userForm: FormGroup) {
    return this.http.post<MasterDetailHead>(this.ddourl + 'AddMasterDetailHead', userForm.value)
  }

  getMasterDetailHeadById(tmpid: number) {
    return this.http.get<MasterDetailHead>(this.ddourl + 'GetMasterDetailHeadById?id=' + `${tmpid}`)
  }

  updateMasterDetailHeadById(tmpid: number, userForm: FormGroup) {
    return this.http.put<MasterDetailHead>(this.ddourl + 'UpdateMasterDetailHead?id=' + `${tmpid}`, userForm.value)
  }
  deleteMasterDetailHeadById(tmpid : number){
    return  this.http.delete(this.ddourl + 'DeleteMasterDetailHead?id=' + `${tmpid}`)
  }
}
