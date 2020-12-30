import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from '../components/front-page/front-page.component';
import { RegisterComponent } from '../components/register/register.component';

const routes: Routes = [
    { path: "frontPage", component: FrontPageComponent },
    // { path: "products", canActivate: [LoginGuardService], component: ProductsComponent },
    // { path: "users", canActivate: [LoginGuardService], component: UsersComponent },
    // { path: "add-user", canActivate: [LoginGuardService], component: AddUserComponent },
    { path: "register", component: RegisterComponent },
    // { path: "contact-us", component: ContactUsComponent },
    // { path: "login", component: LoginComponent },
    { path: "", redirectTo: "frontPage", pathMatch: "full" }, // pathMatch = התאמת המחרוזת הריקה לכלל הנתיב
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
