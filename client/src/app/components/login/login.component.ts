import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UserService } from 'src/app/services/UserService';

// For each component there is a selector that you can use inside another component and call this component
// here you have also the html and css template which are called when you use this main component
// the @ is a metadata - information about information

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    public userLoginDetails: UserLoginDetails;
    public usersService: UserService;

    constructor(usersService: UserService,  private router: Router) {
        this.userLoginDetails = new UserLoginDetails();
        this.usersService = usersService;
    }

    public login(): void {
    
console.log("this.userLoginDetails = " + this.userLoginDetails.userName, this.userLoginDetails.password);

const observable = this.usersService.login(this.userLoginDetails);

observable.subscribe(successfulServerRequestData => {
    console.log("successfulServerRequestData =  " +successfulServerRequestData);                    
    
    sessionStorage.setItem("token", successfulServerRequestData.token+"");
    this.usersService.userType = successfulServerRequestData.userType;

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

    ngOnInit() {
    }

}
