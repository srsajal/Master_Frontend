import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DynamicTable } from 'mh-prime-dynamic-table';
import { environment } from 'src/environments/environment';
import { IapiResponce } from 'src/Model/iapi-responce';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MastermajorheadService {
  majorheadurl = environment.BaseURL + 'masterMajorHead/';
  http = inject(HttpClient);

  constructor() { }

  getMHData(tableQueryParameters: DynamicTableQueryParameters | any) : Observable<IapiResponce> {
    return this.http.post<IapiResponce<DynamicTable<any>>>(this.majorheadurl + 'GetMasterMAJORHEAD', tableQueryParameters)
  }
  postData(userForm : FormGroup){
    return this.http.post<any>(this.majorheadurl + 'AddMasterMAJORHEAD', userForm.value)
  }
  

}
