import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Observable } from 'rxjs';
import { environment,  } from 'src/environments/environment';
import { IapiResponce } from 'src/Model/iapi-responce';
import { masterSchemeHead } from 'src/Model/master.model';

@Injectable({
  providedIn: 'root'
})
export class SchemeHeadServiceService {

 private schemehead = environment.BaseURL+'masterSCHEME_HEAD/';
  http = inject(HttpClient);

  constructor() { }

  getmasterSCHEME_HEAD(tableQueryParameters: DynamicTableQueryParameters | any) : Observable<IapiResponce> {
    return this.http.post<IapiResponce<DynamicTable<masterSchemeHead>>>(this.schemehead + 'GetMasterSCHEME_HEAD', tableQueryParameters)
  }

  postmasterSCHEME_HEAD(userForm: FormGroup) {
    return this.http.post<masterSchemeHead>(this.schemehead + 'AddMasterSCHEME_HEAD', userForm.value)
  }

  GetMasterSCHEME_HEADById(tmpid: number) {
    return this.http.get<masterSchemeHead>(this.schemehead + 'GetMasterSCHEME_HEADById?id=' + `${tmpid}`)
  }

  updatemasterSCHEME_HEAD(tmpid: number, userForm: FormGroup):Observable<masterSchemeHead> {
    return this.http.put<masterSchemeHead>('http://localhost:5271/api/masterSCHEME_HEAD/UpdateMasterSCHEME_HEAD?id=' + `${tmpid}`, userForm.value)
  }
  deletemasterSCHEME_HEAD(tmpid : number){
    return  this.http.delete('http://localhost:5271/api/masterSCHEME_HEAD/DeleteMasterSchemeHead?id=' + `${tmpid}`)
  }
  }


