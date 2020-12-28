import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UserService } from 'src/app/services/UserService';


// For each component there is a selector that you can use inside another component and call this component
// here you have also the html and css template which are called when you use this main component
// the @ is a metadata - information about information

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


    public userLoginDetails: UserLoginDetails;
    public usersService: UserService;

    constructor(usersService: UserService) {
        this.userLoginDetails = new UserLoginDetails();
        this.usersService = usersService;
    }

    public login(): void {
    

        const observable = this.usersService.login(this.userLoginDetails);
        observable.subscribe(successfulServerRequestData => {
            alert('Success');
        }, serverErrorResponse => { 
            alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
        });

    }

    ngOnInit() {
    }

}
