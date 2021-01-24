import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LayoutComponent } from '../components/layout/layout.component';
import { HeaderComponent } from '../components/header/header.component';
import { FrontPageComponent } from '../components/front-page/front-page.component';
import { AboutComponent } from '../components/about/about.component';
import { InfoComponent } from '../components/info/info.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { AdminComponent } from '../components/admin/admin.component';
import { CustomerComponent } from '../components/customer/customer.component';
import { UserService } from '../services/UserService';
import { ProductService } from '../services/ProductService';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from '../components/interceptors/AuthenticationInterceptor';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PoductsPipeBySearch } from '../components/pipes/poducts-pipe-by-search.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OrderComponent } from '../components/order/order.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    InfoComponent,
    FrontPageComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    CustomerComponent,
    PoductsPipeBySearch,
    OrderComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    MatSidenavModule

  ],
  providers: [UserService
    , ProductService
    , { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
    ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
