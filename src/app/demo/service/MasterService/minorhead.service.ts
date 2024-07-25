import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IapiResponce } from 'src/Model/iapi-responce';
import { Code, minorHead } from 'src/Model/master.model';
@Injectable({
  providedIn: 'root'
})
export class MinorheadService {

  minorheadurl = environment.BaseURL + 'masterMinorHead/';
  http = inject(HttpClient);

  constructor() { }

  getmasterMinorhead(isActive:boolean, tableQueryParameters: DynamicTableQueryParameters | any) : Observable<IapiResponce> {
    return this.http.post<IapiResponce<DynamicTable<minorHead>>>(this.minorheadurl + 'GetmasterMinorHead?isActive=' + isActive, tableQueryParameters)
  }

  getMasterCodeSubmajorhead(){
    return this.http.get<Code[]>(this.minorheadurl + 'GetSubMajorHeadCode')
  }
 

  postMasterMinorhead(userForm: FormGroup) {
    return this.http.post<minorHead>(this.minorheadurl + 'AddmasterMinorHead', userForm.value)
  }

  getMasterMinorheadById(tmpid: number) {
    return this.http.get<minorHead>(this.minorheadurl + 'GetmasterMinorHeadById?id=' + `${tmpid}`)
  }

  updateMasterMinorheadById(tmpid: number, userForm: FormGroup):Observable<minorHead> {
    return this.http.put<minorHead>(this.minorheadurl + 'UpdatemasterMinorHead?id=' + `${tmpid}`, userForm.value)
  }
  deleteMasterMinorheadById(tmpid : number){
    return  this.http.delete(this.minorheadurl + 'DeletemasterMinorHead?id=' + `${tmpid}`)
  }

  countMasterMinorhead(isActive:boolean, tableQueryParameters: DynamicTableQueryParameters | any){
    return this.http.post<IapiResponce<DynamicTable<minorHead>>>(this.minorheadurl + 'CountMasterMinorHead?isActive='+isActive, tableQueryParameters)
  }
  
  restoreMasterMinorheadById(tmpid : number){
    return this.http.delete(this.minorheadurl + 'RestoreMasterMinorHead?id='  + `${tmpid}`);
  }

  
}
