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
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    MDBBootstrapModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
