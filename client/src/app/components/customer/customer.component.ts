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
          // console.error(this.coupons);
      }, error => {
          alert('Failed to get coupons ' + JSON.stringify(error));
      });

      // this.userService.createUser(new UserLoginDetails("avi", "1234")).subscribe(successfulServerRequestData => {
      //     console.log(successfulServerRequestData);                                        
      // }, serverErrorResponse => {                     
      //     alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);            
      // }); 


  }

  public onProductClicked(product: Product) {
      this.router.navigate(["/products/" + product.productId]);
  }

  public showProducts(){
      this.isShowAllProducts = true;
  }  

}
