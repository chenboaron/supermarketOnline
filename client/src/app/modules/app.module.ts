import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LayoutComponent } from '../components/layout/layout.component';
import { RegistarComponent } from '../components/registar/registar.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MenuComponent } from '../components/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from '../components/main/main.component';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InfoComponent } from '../components/info/info.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    LayoutComponent,
    RegistarComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    MainComponent,
    InfoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule, 
    RoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()

  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
