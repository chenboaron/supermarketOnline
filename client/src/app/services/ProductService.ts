import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
 
    constructor(private http: HttpClient) {}

    public getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>("http://localhost:3001/products");
    }

    public getProduct(id:number): Observable<Product> {
        return this.http.get<Product>("http://localhost:3001/products/"+id);
    }
}