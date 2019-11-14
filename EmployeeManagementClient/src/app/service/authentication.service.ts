import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { map } from 'rxjs/operators';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private URL = "http://localhost:8080/";
  private isEmpLoggedIn = new BehaviorSubject(<Boolean>(false));
  isEmployeeLoggedIn = this.isEmpLoggedIn.asObservable();


  constructor(private httpClient: HttpClient) { }
  authenticate(username, password) {
    let json = {"username" : username, "password" : password};
    return this.httpClient.post<any>('http://localhost:8080/employee/authenticate',json).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        let tokenStr= 'Bearer '+userData.token;
        sessionStorage.setItem('token', tokenStr);
        return userData;
       }
     )

    );
  }

  // authenticate(emp: Employee) {
  //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(emp.ename + ':' + emp.password) });
  //   return this.httpClient.post<Employee>(this.URL+'employee/login', emp, {headers}).pipe(
  //    map(
  //      employee => {
  //       sessionStorage.setItem('username',employee.ename);
  //       let authString = 'Basic ' + btoa(employee.ename + ':' + employee.password);
  //       sessionStorage.setItem('basicauth', authString);
  //       return employee;
  //      }
  //    )

  //   );
    // if (username === "mahendra" && password === "mahendra") {
    //   sessionStorage.setItem('username', username)
    //   return true;
    // } else {
    //   return false;
    // }
  // }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    this.isEmpLoggedIn.next(!(user === null));
    return !(user === null)
  }
  

  logOut() {
    sessionStorage.removeItem('username');
    this.isEmpLoggedIn.next(false);
    return false;
  }
}
