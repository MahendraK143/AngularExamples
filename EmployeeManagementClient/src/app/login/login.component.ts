import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { Login } from '../models/login';
import { Department } from '../models/department';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginModel= new Login('','');
  private deptModel= new Department(1,'IT','Bangalore');
  private employeeModel= new Employee(1,'','','','',0,'',this.deptModel);
  invalidLogin = false
  private errorMsg: string;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private loginservice: AuthenticationService) { }

  ngOnInit() {
    this.route.paramMap
  }

  checkLogin() {
    (this.loginservice.authenticate(this.employeeModel.ename,this.employeeModel.password).subscribe(
      data => {
        this.invalidLogin = false;
      this.errorMsg = "";
      this.loginservice.isUserLoggedIn();
      this.router.navigate(['home']);
      },
      error => {
        this.invalidLogin = true;
      this.errorMsg = "Please enter valid username and passowrd";
      this.router.navigate(['']);

      }));
    // if (this.loginservice.authenticate(this.loginModel.username, this.loginModel.password)
    // ) {
    //   this.invalidLogin = false;
    //   this.errorMsg = "";
    //   this.loginservice.isUserLoggedIn();
    //   this.router.navigate(['home']);
    // } else{
    //   this.invalidLogin = true;
    //   this.errorMsg = "Please enter valid username and passowrd";
    //   this.router.navigate(['']);
    // }
  }
}
