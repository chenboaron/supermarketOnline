import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { UserRegisterDetails } from '../models/UserRegisterDetails';


@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class UserService {
    // private http: HttpClient;
    private loginToken:string;
    public userType : string;

    // HttpClient injection (a class variable will be automatically created)
    constructor(private http: HttpClient) {
        // this.http = http;
    }
    public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {

        // Inside the brackets <> is the type of a successful server response
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // THE FOLLOWING LINE IS IS NOT AN HTTP REQUEST BEING SENT
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        //  The http request will be sent after the subscribe() method will be called
        console.log("userLoginDetails = " + userLoginDetails.password, userLoginDetails.userName);
        return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
    }

    public register(userRegisterDetails: UserRegisterDetails): Observable<SuccessfulLoginServerResponse> {      

        console.log("userRegisterDetails = " + userRegisterDetails.password, userRegisterDetails.userName);
        return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/register", userRegisterDetails);
    }

    public getLoginToken(): string{
        return this.loginToken;
    }

    public setLoginToken(token:any): void{
        this.loginToken = token;
    }
}
