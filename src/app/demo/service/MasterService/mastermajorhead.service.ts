import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DynamicTable } from 'mh-prime-dynamic-table';
import { environment } from 'src/environments/environment';
import { IapiResponce } from 'src/Model/iapi-responce';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { majorHead } from 'src/Model/master.model';

@Injectable({
  providedIn: 'root'
})
export class MastermajorheadService {
  majorheadurl = environment.BaseURL + 'masterMajorHead/';
  http = inject(HttpClient);

  constructor() { }

  getMHData(isActive:boolean,tableQueryParameters: DynamicTableQueryParameters | any) : Observable<IapiResponce> {
    return this.http.post<IapiResponce<DynamicTable<any>>>(this.majorheadurl + 'GetMasterMAJORHEAD?isActive='+ isActive, tableQueryParameters)
  }
  postData(userForm : FormGroup){
    return this.http.post<majorHead>(this.majorheadurl + 'AddMasterMAJORHEAD', userForm.value)
  }
  EditData(tmpid: number) {
    return this.http.get<majorHead>(this.majorheadurl + 'GetMasterMAJORHEADById?id=' + `${tmpid}`)
  }
  update(id: number,userForm : FormGroup){
  return this.http.put<majorHead>(this.majorheadurl + 'UpdateMasterMAJORHEAD?id=' + `${id}` , userForm.value)
  }
  delData(tmpid: number) {
    return this.http.delete(this.majorheadurl + 'DeleteMasterMAJORHEAD?id=' + `${tmpid}`)
  }
  onChange(tmpid: string){
    return this.http.get(this.majorheadurl + 'CheckMasterMAJORHEADCode/' + tmpid)
  }
  countMasterMajorHead(isActive:boolean, tableQueryParameters: DynamicTableQueryParameters | any){
    return this.http.post<IapiResponce<DynamicTable<majorHead>>>(this.majorheadurl + 'CountMasterMajorHead?isActive='+isActive, tableQueryParameters)
  }

}
