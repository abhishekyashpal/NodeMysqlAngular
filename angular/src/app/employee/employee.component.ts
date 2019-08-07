import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employees: Object;
  

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
   this.refreshEmployeeList();
    }

    refreshEmployeeList() {
      this.employeeService.getEmployees().subscribe( 
        data => this.employees = data
      );
    }

    

}
