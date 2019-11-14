import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Department } from './models/department';
import { Employee } from './models/employee';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private URL = "http://localhost:8080/";
  constructor(private http:HttpClient) { }
  private departmentId = new BehaviorSubject(<Number>(1));
  deptId = this.departmentId.asObservable();
  private department = new BehaviorSubject((new Department(1,"","")));
  dept = this.department.asObservable();
  private isEmpForm = new BehaviorSubject(<Boolean>(false));
  isEmployeeForm = this.isEmpForm.asObservable();
  private rMsg = new BehaviorSubject(<String>(""));
  returnMsg = this.rMsg.asObservable();
  private employeeSearch = new BehaviorSubject(<String>(""));
  searchEmpText = this.employeeSearch.asObservable();

  getDepartmentList(): Observable<Department[]>{
    // let username='mahendra'
    // let password='mahendra'
  
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    
    return this.http.get<Department[]>(this.URL+"employee/departments");
  }
  getEmployeeList(): Observable<Employee[]>{

    // let username='mahendra'
    // let password='mahendra'
  
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    
    return this.http.get<Employee[]>(this.URL+"employee/list");
  }
  getEmployeeListByDepartmentId(deptId: Number) {
    // let username='mahendra'
    // let password='mahendra'
  
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    
    return this.http.get<Employee[]>(this.URL+"employee/listByDepartmentId/"+deptId);
  }
  createNewEmployee(employee: Employee): Observable<String> {
    // let username='mahendra'
    // let password='mahendra'
  
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    
    return this.http.post<String>(this.URL+"employee/save",employee)
    .pipe(catchError(this.handleException));
  }
  changeDeptId(id:Number){
    this.departmentId.next(id);
  }
  changeDept(dept:Department){
    this.department.next(dept);
    //this.isEmpForm.next(true);
  }
  updateIsEmployeeForm(value:Boolean){
    this.isEmpForm.next(value);
  }
  updateReturnMsg(msg: String) {
    this.rMsg.next(msg);
  }
  searchEmployeeByName(msg: String) {
    this.employeeSearch.next(msg);
  }
  handleException(error: HttpErrorResponse) {
    //this.updateReturnMsg(error.message);
    return throwError(error.error.message);
  }
 }

