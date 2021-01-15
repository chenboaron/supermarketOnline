import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/CartItem';
import { CartItemToServer } from 'src/app/models/CartItemToServer';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart-service';
import { ProductService } from 'src/app/services/ProductService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public products: Product[];
  public currentProducts: Product[];
  public meatAndFish: Product[];
  public drinking: Product[];
  public fruitsAndVegetables: Product[];
  public milkAndEggs: Product[];
  public searchValue: string;




  public isShowAllProducts: boolean;

  constructor(private productService: ProductService, public cartService: CartService, public router: Router) {
  }

  ngOnInit() {
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

  }

  public onProductClicked(product: Product) {
    Swal.fire({
      title: 'Name: ' + product.productName,
      html: 'Category: ' + product.productCategory + "<p>" +
        'Price: ' + product.productPrice +
        "</p>" + "<input type='number' id='amountOfProduct' value='1' min='1' max='100'>",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      imageUrl: product.imageURL,
      imageWidth: 380,
      imageHeight: 300,
      imageAlt: 'Custom image',
    }).then((result) => {
      if (result.isConfirmed) {
        let input = document.getElementById("amountOfProduct") as HTMLInputElement;
        let amountOfProduct = +input.value;

        let cartItemToServer = new CartItemToServer(product.productId, amountOfProduct, 1);

        let observable = this.cartService.addItemToCart(cartItemToServer);

        observable.subscribe(() => {
          let newItem = new CartItem(product, amountOfProduct, amountOfProduct * product.productPrice, 1);
          let isItemExist: boolean = false;
          for (let index = 0; index < this.cartService.allCartItems.length; index++) {
            if (this.cartService.allCartItems[index].product.productId === newItem.product.productId) {
              this.cartService.allCartItems[index].amountOfProduct = newItem.amountOfProduct;
              this.cartService.allCartItems[index].totalPrice = newItem.amountOfProduct*newItem.product.productPrice;
              isItemExist = true;
            }
          }

          if (!isItemExist) {
            this.cartService.allCartItems.push(newItem);
          }

        }, error => {
          alert('Failed to get carts ' + JSON.stringify(error));
        });



      }
    })
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

  public onChangeValue(value: string) {
    console.log(value);
  }
}
