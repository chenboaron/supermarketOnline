import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from '../components/main/main.component'

const routes: Routes = [
    { path: "home", component: MainComponent },
    // { path: "products", canActivate: [LoginGuardService], component: ProductsComponent },
    // { path: "users", canActivate: [LoginGuardService], component: UsersComponent },
    // { path: "add-user", canActivate: [LoginGuardService], component: AddUserComponent },
    // { path: "about", component: AboutComponent },
    // { path: "contact-us", component: ContactUsComponent },
    // { path: "login", component: LoginComponent },
    { path: "", redirectTo: "home", pathMatch: "full" }, // pathMatch = התאמת המחרוזת הריקה לכלל הנתיב
    // { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes) // Importing the above routes
  ]
  })
export class RoutingModule {

 }
