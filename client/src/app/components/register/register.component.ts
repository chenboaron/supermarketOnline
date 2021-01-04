import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegisterDetails } from 'src/app/models/UserRegisterDetails';
import { UserService } from 'src/app/services/UserService';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public userDetailsForm: FormGroup;

  public userId: FormControl;
  public firstName: FormControl;
  public lastName: FormControl;
  public userName: FormControl;
  public password: FormControl;
  public passwordConfirm: FormControl;
  public city: FormControl;
  public street: FormControl;

  public userRegisterDetails: UserRegisterDetails;

  constructor(private usersService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userRegisterDetails = new UserRegisterDetails();

    // Initializing form controls with validators
    this.userId = new FormControl("", [Validators.required, Validators.pattern("[0-9]{9}$")]);
    this.firstName = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]{1,15}")]);
    this.lastName = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]{1,15}")]);
    this.userName = new FormControl("", [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
    this.password = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z0-9]{4,25}")]);
    this.passwordConfirm = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z0-9]{4,25}")]);
    this.city = new FormControl("", Validators.required);
    this.street = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]{1,15}")]);

    // Initializing the from group
    this.userDetailsForm = new FormGroup({

      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
      city: this.city,
      street: this.street,
    });

  }

  public isPasswordMatch(password: FormControl, passwordConfirm: FormControl): boolean {
    if (password === passwordConfirm) {
      return true;
    }
    return false;
  }


  public register(): void {
    this.userRegisterDetails.userId = this.userId.value;
    this.userRegisterDetails.firstName = this.firstName.value;
    this.userRegisterDetails.lastName = this.lastName.value;
    this.userRegisterDetails.userName = this.userName.value;
    this.userRegisterDetails.password = this.password.value;
    this.userRegisterDetails.passwordConfirm = this.passwordConfirm.value;
    this.userRegisterDetails.city = this.city.value;
    this.userRegisterDetails.street = this.street.value;


    const observable = this.usersService.register(this.userRegisterDetails);

    observable.subscribe(successfulServerRequestData => {


      console.log("successfulServerRequestData.firstName = " + successfulServerRequestData.firstName);
      
      let userInfo = {
        token: successfulServerRequestData.token + "",
        userType: successfulServerRequestData.userType,
        firstName: successfulServerRequestData.firstName
      }

      sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
      this.usersService.userType = successfulServerRequestData.userType;

      if (successfulServerRequestData.userType == "USER") {
        this.router.navigate(["/customer"]);
      }

      if (successfulServerRequestData.userType == "ADMIN") {
        this.router.navigate(["/admin"]);
      }

      // if(successfulServerRequestData.userType == "COMPANY"){
      //     this.router.navigate(["/company"]);
      // }
    }, serverErrorResponse => {
      // this.router.navigate(["/api/admin"]);

      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);


    });
  }


}
