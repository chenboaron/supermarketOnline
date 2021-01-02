import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UserService } from 'src/app/services/UserService';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// For each component there is a selector that you can use inside another component and call this component
// here you have also the html and css template which are called when you use this main component
// the @ is a metadata - information about information

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    
    public userDetailsForm: FormGroup;
    public userName: FormControl;
    public password: FormControl;

    public userLoginDetails: UserLoginDetails;
    public usersService: UserService;

    constructor(usersService: UserService, private router: Router) {
        this.userLoginDetails = new UserLoginDetails();
        this.usersService = usersService;
    }

    public login(): void {
        this.userLoginDetails.userName = this.userName.value;
        this.userLoginDetails.password = this.password.value;

        const observable = this.usersService.login(this.userLoginDetails);

        observable.subscribe(successfulServerRequestData => {
            alert("successfulServerRequestData =  " + JSON.stringify(successfulServerRequestData));

            sessionStorage.setItem("token", successfulServerRequestData.token + "");
            this.usersService.userType = successfulServerRequestData.userType;

            if(successfulServerRequestData.userType == "USER"){
                this.router.navigate(["/customer"]);
            }

            if(successfulServerRequestData.userType == "ADMIN"){
                this.router.navigate(["/admin"]);
            }

            // if(successfulServerRequestData.userType == "COMPANY"){
            //     this.router.navigate(["/company"]);
            // }
        }, serverErrorResponse => {
            // this.router.navigate(["/api/admin"]);
            alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
        });

    }

    ngOnInit() {
                // Initializing form controls with validators
                this.userName = new FormControl("", [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
                this.password = new FormControl("", Validators.required);
                
                // Initializing the from group
                this.userDetailsForm = new FormGroup({
                    userName : this.userName,
                    password : this.password
                });
    }

}

