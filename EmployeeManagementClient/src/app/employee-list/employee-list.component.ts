import { Component, OnInit, Input, Inject } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeServiceService } from '../employee-service.service';
import { DepartmentListComponent } from '../department-list/department-list.component';
import { Department } from '../models/department';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  navTab: string;
  @Input("dept")
  private department:Department;
  private employeeList: Employee[];
  private successMsg: String;
  @Input()
  private searchText;
  constructor(private employeeService:EmployeeServiceService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.navTab = "employee-list";
    //const deptId = +this.route.snapshot.paramMap.get('deptartmentId');
    // if(deptId) 
    //   this.getEmployeeListByDepartmentId(deptId);
    // else
    //   this.employeeService.getEmployeeList().subscribe(data => {
    //     this.employeeList = data;
    //   });
    this.employeeService.deptId.subscribe(id => {
      this.getEmployeeListByDepartmentId(id);
    });
    this.employeeService.dept.subscribe(department =>{
      //alert(data.departmentName);
      this.department = department;
    });
    this.employeeService.returnMsg.subscribe( data => {
      this.successMsg = data;
    });
    this.employeeService.searchEmpText.subscribe ( data => this.searchText = data);
    
  }
  getEmployeeListByDepartmentId(deptId:Number) {
    this.employeeService.getEmployeeListByDepartmentId(deptId).subscribe(data => {
      this.employeeList = data;
    });
  }
  addNewEmployee(department:Department) {
    console.log("employee-list addNewEmployee"+JSON.stringify(department));
    this.employeeService.changeDept(department);
    this.employeeService.updateIsEmployeeForm(true);
    
  }
}
