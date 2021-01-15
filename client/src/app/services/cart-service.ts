import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItemToServer } from '../models/CartItemToServer';
import { Observable } from 'rxjs';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public allCartItems: CartItem[];

    constructor(private http: HttpClient) {
      this.allCartItems=[];
     }

  public addItemToCart(cartItemToServer : CartItemToServer): Observable < any > {
  return this.http.post("http://localhost:3001/carts/addProductToCart", cartItemToServer);
}

  
}
