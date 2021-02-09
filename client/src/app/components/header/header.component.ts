import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public name : HTMLInputElement;
  constructor(private usersService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.name =document.getElementById("name")  as HTMLInputElement;
    this.name.innerHTML = localStorage.getItem("firstName");
  }


  public logout() :void{  


    const observable = this.usersService.logout();

    observable.subscribe(() => {
      localStorage.clear();
      this.router.navigate(["/frontPage"]);
    }, serverErrorResponse => {
        alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
    });



  }

}
