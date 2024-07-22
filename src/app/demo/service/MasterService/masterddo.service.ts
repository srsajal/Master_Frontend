import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IapiResponce } from 'src/Model/iapi-responce';
import { Code, MasterDdo } from 'src/Model/master.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  ddourl = environment.BaseURL + 'masterDDO/';
  http = inject(HttpClient);
  constructor() { }

  getMasterDDO(isActive:boolean, tableQueryParameters: DynamicTableQueryParameters | any) : Observable<IapiResponce> {
    return this.http.post<IapiResponce<DynamicTable<MasterDdo>>>(this.ddourl + 'GetMasterDdo?isActive='+isActive, tableQueryParameters)
  }

  getMasterCodeTreasury(){
    return this.http.get<Code[]>(this.ddourl + 'GetTreasuryCode')
  }

  postMasterDDO(userForm: FormGroup) {
    return this.http.post<MasterDdo>(this.ddourl + 'AddMasterDdo', userForm.value)
  }

  getMasterDDOById(tmpid: number) {
    return this.http.get<MasterDdo>(this.ddourl + 'GetMasterDdoById?id=' + `${tmpid}`)
  }

  updateMasterDDOById(tmpid: number, userForm: FormGroup) {
    return this.http.put<MasterDdo>(this.ddourl + 'UpdateMasterDdo?id=' + `${tmpid}`, userForm.value)
  }
  deleteMasterDDOById(tmpid : number){
    return  this.http.delete(this.ddourl + 'DeleteMasterDdo?id=' + `${tmpid}`)
  }

}
