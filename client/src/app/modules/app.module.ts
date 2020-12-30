import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LayoutComponent } from '../components/layout/layout.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { FrontPageComponent } from '../components/front-page/front-page.component';
import { AboutComponent } from '../components/about/about.component';
import { InfoComponent } from '../components/info/info.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { RegisterStep1Component } from '../components/register-step1/register-step1.component';
import { RegisterStep2Component } from '../components/register-step2/register-step2.component';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    InfoComponent,
    FrontPageComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    RegisterStep1Component,
    RegisterStep2Component

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
    MatSelectModule

  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
