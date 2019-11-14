import { Component, OnInit, Input } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { Department } from '../models/department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  navTab: string;
  public dept:Department;
  public isEmployeeform: Boolean;
  public departments:Department[];
  private successMsg: String;
  constructor(private employeeService:EmployeeServiceService,
              private router: Router) { }

  ngOnInit() {
    this.navTab = "Dept";
    this.employeeService.getDepartmentList().subscribe(data =>{
      //alert(data[0].departmentName);
      this.departments = data;
    });
    this.employeeService.isEmployeeForm.subscribe(isEmployeeform => { 
      console.log(isEmployeeform);
      this.isEmployeeform = isEmployeeform});
    this.employeeService.returnMsg.subscribe( data => this.successMsg = data); 
  }
  getEmployeeListByDeptWise(department:Department){
    console.log(department);
    this.dept = department;
    this.employeeService.changeDeptId(department.departmentId);
    this.employeeService.changeDept(department);
    //this._service.getEmployeeDetails(employee.id);
    //this.employee.next(this.router.navigate(['/getEmployeeDetails', employee.id]));
    //return this.router.navigate(['/getEmployeeDetails', employee.id]);
    return this.router.navigate(['departments']);
  }
}
