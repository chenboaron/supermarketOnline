import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public showFiller = false;

  public products: Product[];
  public isShowAllProducts: boolean;

  //   constructor(private userService:UserService) { }
  constructor(private productService: ProductService, public router: Router) {
   }

  ngOnInit() {
    this.products = [];

      this.isShowAllProducts = true;
      let observable = this.productService.getAllProducts();

      observable.subscribe(productsList => {
          this.products = productsList;
      }, error => {
          alert('Failed to get products ' + JSON.stringify(error));
      });

  }

  public onProductClicked(product: Product) {
      this.router.navigate(["/products/" + product.productId]);
  }

  public showProducts(){
      this.isShowAllProducts = true;
  }  

}
