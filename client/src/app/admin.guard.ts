import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
public constructor(private router:Router){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const userType = localStorage.getItem("userType");
    
    if(userType === "ADMIN"){
      return true;
    }


    this.router.navigateByUrl('/frontPage');
    alert('you are not authorized to go there');
    return false;
  }
  
}
