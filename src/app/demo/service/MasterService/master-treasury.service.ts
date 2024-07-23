import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IapiResponce } from 'src/Model/iapi-responce';
import {  MasterTreasury } from 'src/Model/master.model';

@Injectable({
  providedIn: 'root'
})
export class MasterTreasuryService {
  treasuryurl = environment.BaseURL + 'masterTreasury/';
  http = inject(HttpClient);
  constructor() { }

  getMasterTreasury(isActive:boolean, tableQueryParameters: DynamicTableQueryParameters | any) : Observable<IapiResponce> {
    return this.http.post<IapiResponce<DynamicTable<MasterTreasury>>>(this.treasuryurl + 'GetMasterTreasury?isActive='+isActive, tableQueryParameters)
  }


  postMasterTreasury(userForm: FormGroup) {
    return this.http.post<MasterTreasury>(this.treasuryurl + 'AddMasterTreasury', userForm.value)
  }

  getMasterTreasuryById(tmpid: number) {
    return this.http.get<MasterTreasury>(this.treasuryurl + 'GetMasterTreasuryById?id=' + `${tmpid}`)
  }

  updateMasterTreasuryById(tmpid: number, userForm: FormGroup) {
    return this.http.put<MasterTreasury>(this.treasuryurl + 'UpdateMasterTreasury?id=' + `${tmpid}`, userForm.value)
  }
  deleteMasterTreasuryById(tmpid : number){
    return  this.http.delete(this.treasuryurl + 'DeleteMasterTreasury?id=' + `${tmpid}`)
  }

  restoreMasterTreasuryById(tmpid : number){
    return this.http.delete(this.treasuryurl + 'RestoreMasterTreasury?id='  + `${tmpid}`);
  }

}
