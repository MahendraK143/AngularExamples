import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from './employee-service.service';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private searchText:String;
  title = 'EmployeeManagementClient';
  private isUserLoggedIn: Boolean;
  constructor(private employeeService: EmployeeServiceService,
              private loginService: AuthenticationService,
              private router: Router){}
  ngOnInit() {
    // this.isUserLoggedIn = this.loginService.isUserLoggedIn();
    // this.loginService.isUserLoggedIn.subscribe(data =>{
      // if(this.loginService.isUserLoggedIn) {
      //   this.isUserLoggedIn = true;
      //   this.router.navigate(['home']);
      // } else {
      //   this.router.navigate(['']);
      // }
    // });
    
  }
  logout(){
    this.isUserLoggedIn = this.loginService.logOut();
    if(!this.isUserLoggedIn) {
      this.router.navigate(['']);
    }
  }
  searchEmployee(value){
    console.log(value);
    this.employeeService.searchEmployeeByName(value);
  }
}
