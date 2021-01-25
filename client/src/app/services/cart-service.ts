import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItemToServer } from '../models/CartItemToServer';
import { Observable } from 'rxjs';
import { AllCartItems } from '../models/AllCartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  public allCartItems: AllCartItems[];

  constructor(private http: HttpClient) {
    this.allCartItems = [];
  }

  public addItemToCart(cartItemToServer: CartItemToServer): Observable<any> {
    return this.http.post("http://localhost:3001/carts/addProductToCart", cartItemToServer);
  }

  public getCart(): Observable<any> {
    return this.http.get("http://localhost:3001/carts");
  }

  public removeCartItem(productID: Number): Observable<any> {
    return this.http.delete("http://localhost:3001/carts/deleteItem/" + productID);
  }

  public removeAllCartItems(): Observable<any> {
    return this.http.delete("http://localhost:3001/carts/deleteAllItems");

  }
}
