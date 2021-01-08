import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { UserRegisterDetails } from '../models/UserRegisterDetails';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private loginToken:string;
    public userType : string;
    public firstName : string;

    constructor(private http: HttpClient) {}

    public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {

        return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
    }

    public register(userRegisterDetails: UserRegisterDetails): Observable<SuccessfulLoginServerResponse> {      

        return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/register", userRegisterDetails);
    }

    public getLoginToken(): string{
        return this.loginToken;
    }

    public setLoginToken(token:any): void{
        this.loginToken = token;
    }

    public getFirstName(): string{
        return this.firstName;
    }
    

}
