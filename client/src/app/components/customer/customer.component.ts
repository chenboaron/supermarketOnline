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
 
  public products : Product[];
  public currentProducts : Product[];
  public meatAndFish: Product[];
  public drinking: Product[];
  public fruitsAndVegetables: Product[];
  public milkAndEggs: Product[];




  public isShowAllProducts: boolean;

  //   constructor(private userService:UserService) { }
  constructor(private productService: ProductService, public router: Router) {
  }

  ngOnInit() {
    this.products = [];
    this.currentProducts = [];

    

    this.isShowAllProducts = true;
    let observable = this.productService.getAllProducts();

    observable.subscribe(productsList => {
      this.products = productsList;
      this.currentProducts = productsList;
      this.meatAndFish =  this.currentProducts.filter(Product => Product.productCategory === "Meat and fish");
      this.drinking =this.currentProducts.filter(Product => Product.productCategory === "drinking");
      this.fruitsAndVegetables = this.currentProducts.filter(Product => Product.productCategory =="Fruits and Vegetables");
      this.milkAndEggs = this.currentProducts.filter(Product => Product.productCategory === "Milk and eggs");
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });

  }

  public onProductClicked(product: Product) {
    this.router.navigate(["/products/" + product.productId]);
  }

  public showProducts() {
    this.isShowAllProducts = true;
  }

  public onClikDrinking() {
    this.currentProducts =this.drinking;
  }
  public onClikFruitsAndVegetables() {
    this.currentProducts =this.fruitsAndVegetables;
  }
  public onClikMilkAndEggs() {
    this.currentProducts =this.milkAndEggs;
  }
  public onClikMeatAndFish() {
    this.currentProducts =this.meatAndFish;
  }
  public onClikAllProducts(){
    this.currentProducts =this.products;

  }
}
