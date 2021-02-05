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
  public productId: FormControl;
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

    this.productId = new FormControl("");
    this.productName = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]{1,15}")]);
    this.productCategory = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]{1,30}")]);
    this.productPrice = new FormControl("", [Validators.required, Validators.pattern("[0-9]{4,25}")]);
    this.imageURL = new FormControl("", [Validators.required]);


    // Initializing the from group
    this.productDetailsForm = new FormGroup({
      productId: this.productId,
      productName: this.productName,
      productCategory: this.productCategory,
      productPrice: this.productPrice,
      imageURL: this.imageURL,

    });

  }
  public save() {
    let productDetails = this.productDetailsForm.value;
    let product = new Product(productDetails.productId, productDetails.productName, productDetails.productCategory, productDetails.productPrice, productDetails.imageURL);


    let observable = this.productService.addOrEditProduct(product);

    observable.subscribe(() => {
      if (product.productId == -1) {
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
      } else {
        for (let index = 0; index < this.currentProducts.length; index++) {
          if (product.productId == this.currentProducts[index].productId) {
            this.currentProducts[index] = product;
          }
        }
      }



    }, error => {
      alert('Failed to save product' + JSON.stringify(error));
    });
  }

  public onClickAdd() {
    this.productDetailsForm.setValue({
      productId: -1,
      productName: "",
      productCategory: "",
      productPrice: "",
      imageURL: "",
    });
  }


  public onProductClicked(product: Product) {
    this.productDetailsForm.setValue({
      productId: product.productId,
      productName: product.productName,
      productCategory: product.productCategory,
      productPrice: product.productPrice,
      imageURL: product.imageURL,
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
