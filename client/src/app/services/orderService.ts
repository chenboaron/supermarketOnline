import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {



  constructor(private http: HttpClient) {

    
  }

  public order(order :Order): Observable<any> {
    return this.http.post("http://localhost:3001/orders", order);
  }
}
