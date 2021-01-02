import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegisterDetails } from 'src/app/models/UserRegisterDetails';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userRegisterDetails: UserRegisterDetails;

  constructor(private usersService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userRegisterDetails = new UserRegisterDetails();

  }

  public register(): void {


    const observable = this.usersService.register(this.userRegisterDetails);

    observable.subscribe(successfulServerRequestData => {
      console.log("successfulServerRequestData =  " + JSON.stringify(successfulServerRequestData));

      sessionStorage.setItem("token", successfulServerRequestData.token + "");
      this.usersService.userType = successfulServerRequestData.userType;
      this.router.navigate(["/frontPage"]);
      // if(successfulServerRequestData.userType == "CUSTOMER"){
      //     this.router.navigate(["/customer"]);
      // }

      // if(successfulServerRequestData.userType == "ADMIN"){
      //     this.router.navigate(["/admin"]);
      // }

      // if(successfulServerRequestData.userType == "COMPANY"){
      //     this.router.navigate(["/company"]);
      // }
    }, serverErrorResponse => {
      // this.router.navigate(["/api/admin"]);
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
    });
  }


}
