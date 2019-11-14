import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { DepartmentListComponent } from '../department-list/department-list.component';
import { Department } from '../models/department';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  private department: Department;
  private deptList: Department[];
  private deptModel= new Department(1,'IT','Bangalore');
  private employeeModel= new Employee(1,'','','','',0,'',this.deptModel);
  private employeeObj: Employee;
  private employees: Employee[];
  private addAsAManager: Boolean;
  private errorMsg: string;
  private returnMsg: string;
  private messageBean: any;
  private enableDepartmentFields: Boolean;
  constructor(private employeeService: EmployeeServiceService,
              private router: Router) { }

  ngOnInit() {
    this.employeeService.dept.subscribe(department => { this.department = department});
    this.employeeService.getEmployeeList().subscribe(managers => { this.employees = managers});

    this.employeeService.getDepartmentList().subscribe( data => {
      this.deptList = data;
    });
  }
  filterByDeptId(value){
    if(value != '' && value != 0) {
      this.enableDepartmentFields = false;
      this.employeeService.getEmployeeListByDepartmentId(value).subscribe( data =>{ 
        console.log(JSON.stringify(this.employees));
        this.employees = data;
        this.deptList.forEach(dept =>{  
          if(dept.departmentId == value) {
            this.deptModel = new Department(value, dept.departmentName, dept.location);
            this.employeeModel= new Employee(1,'','','','',0,'',this.deptModel);
          }
        })
      });
    } else if(value == 0) {
      this.enableDepartmentFields = true;
      this.employees = null;
      this.deptModel = new Department(0,'','');
      this.employeeModel= new Employee(1,'','','','',0,'',this.deptModel);
    }
  }
  onSubmit(){
    console.log(this.employeeModel);
    // this.employeeObj.ename = this.employeeModel.ename;
    // this.employeeObj.manager = this.employeeModel.manager;
    // this.employeeObj.salary = this.employeeModel.salary;
    // this.employeeObj.hiredate = this.employeeModel.hiredate;
    // this.employeeObj.department.departmentId = this.employeeModel.department.departmentId;
    // this.employeeObj.job = this.employeeModel.job;
    console.log(this.employeeObj);
    this.employeeService.createNewEmployee(this.employeeModel).subscribe( data => {
      this.messageBean = data;
      this.employeeService.updateReturnMsg(this.messageBean.message);
      if(this.messageBean.message.search("successfully")) {
        this.employeeService.updateIsEmployeeForm(false);
        this.router.navigate(["departments"]);
      } else {
        this.errorMsg = data.toString();
      }
    },
    error => {
      this.errorMsg = error;
    });
  }
  addAsAManagerF(event){
    if(this.addAsAManager) {
      this.employeeModel= new Employee(1,'','Manager','0','',0,'',this.deptModel);
    } else {
      this.employeeModel= new Employee(1,'','','','',0,'',this.deptModel);
    }
  }
}
