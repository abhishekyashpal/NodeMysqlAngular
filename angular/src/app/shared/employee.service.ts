import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



 
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

private _url: string = 'http://localhost:2300/employees/';


  constructor(private http: HttpClient) { }

  getEmployees(){
    return this.http.get(this._url);    
  }

  



}
