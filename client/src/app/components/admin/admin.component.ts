import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public products: Product[];
  public currentProducts: Product[];
  public meatAndFish: Product[];
  public drinking: Product[];
  public fruitsAndVegetables: Product[];
  public milkAndEggs: Product[];
  public searchValue: string;
  public isShowAllProducts: boolean;

  public productDetailsForm: FormGroup;
  public productName: FormControl;
  public productCategory: FormControl;
  public productPrice: FormControl;
  public imageURL: FormControl;

  constructor(private productService: ProductService, public router: Router) { }

  ngOnInit(): void {
    this.products = [];
    this.currentProducts = [];
    this.searchValue = "";
    this.isShowAllProducts = true;



    let observable = this.productService.getAllProducts();

    observable.subscribe(productsList => {
      this.products = productsList;
      this.currentProducts = productsList;
      this.meatAndFish = this.currentProducts.filter(Product => Product.productCategory === "Meat and fish");
      this.drinking = this.currentProducts.filter(Product => Product.productCategory === "drinking");
      this.fruitsAndVegetables = this.currentProducts.filter(Product => Product.productCategory == "Fruits and Vegetables");
      this.milkAndEggs = this.currentProducts.filter(Product => Product.productCategory === "Milk and eggs");

    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });


    this.productName = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]{1,15}")]);
    this.productCategory = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]{1,30}")]);
    this.productPrice = new FormControl("", [Validators.required, Validators.pattern("[0-9]{4,25}")]);
    this.imageURL = new FormControl("", [Validators.required]);


    // Initializing the from group
    this.productDetailsForm = new FormGroup({

      productName: this.productName,
      productCategory: this.productCategory,
      productPrice: this.productPrice,
      imageURL: this.imageURL,

    });

  }
  public save() {

  }

  public onClickAdd() {
    this.productDetailsForm.setValue({
      productName : "",
      productCategory : "",
      productPrice : "",
      imageURL : "",
    });
  }


  public onProductClicked(product: Product) {
    this.productDetailsForm.setValue({
      productName : product.productName,
      productCategory : product.productCategory,
      productPrice : product.productPrice,
      imageURL : product.imageURL,
    });
    
  }

  public showProducts() {
    this.searchValue = "";
    this.isShowAllProducts = true;
  }

  public onClikDrinking() {
    this.searchValue = "";
    this.currentProducts = this.drinking;
  }
  public onClikFruitsAndVegetables() {
    this.searchValue = "";
    this.currentProducts = this.fruitsAndVegetables;
  }
  public onClikMilkAndEggs() {
    this.searchValue = "";
    this.currentProducts = this.milkAndEggs;
  }
  public onClikMeatAndFish() {
    this.searchValue = "";
    this.currentProducts = this.meatAndFish;
  }
  public onClikAllProducts() {
    this.searchValue = "";
    this.currentProducts = this.products;
  }






}
