import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllCartItems } from 'src/app/models/AllCartItems';
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

  public sumPrice: number;


  public isShowAllProducts: boolean;

  constructor(private productService: ProductService, public cartService: CartService, public router: Router) {

  }

  ngOnInit() {
    this.products = [];
    this.currentProducts = [];
    this.searchValue = "";
    this.sumPrice=0;



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


    let observableOfCart = this.cartService.getCart();

    observableOfCart.subscribe(allCartItemsFromServer => {
      this.cartService.allCartItems = allCartItemsFromServer;

      this.calculatPrice();

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
        let amount = +input.value;

        if (amount <= 0 || amount > 100) {
          alert("amount Of Product should be between 1 and 100");
          return;
        }

        let cartItemToServer = new CartItemToServer(product.productId, amount);
        let observable = this.cartService.addItemToCart(cartItemToServer);

        observable.subscribe(() => {
          let newItem = new AllCartItems(product.productId, amount, amount * product.productPrice, product.productName);
          let isItemExist: boolean = false;
          for (let index = 0; index < this.cartService.allCartItems.length; index++) {
            if (this.cartService.allCartItems[index].productId === newItem.productId) {
              this.cartService.allCartItems[index].amount = newItem.amount;
              this.cartService.allCartItems[index].totalPrice = newItem.amount * product.productPrice;
              isItemExist = true;
            }
          }

          if (!isItemExist) {
            this.cartService.allCartItems.push(newItem);
          }

          this.calculatPrice();
        }, error => {
          alert('Failed to get carts ' + JSON.stringify(error));
        });



      }
    })
  }

  public calculatPrice() {
    this.sumPrice=0;
    for (let index = 0; index < this.cartService.allCartItems.length; index++) {
      this.sumPrice = this.sumPrice + this.cartService.allCartItems[index].totalPrice;
    }

  }

  public onClikRemove(cartItem: AllCartItems) {

    let observableOfCart = this.cartService.removeCartItem(cartItem.productId);

    observableOfCart.subscribe(() => {
      for (let index = 0; index < this.cartService.allCartItems.length; index++) {
        if (this.cartService.allCartItems[index].productId === cartItem.productId) {
          this.cartService.allCartItems.splice(index, 1);
        }
      }

      this.calculatPrice();
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
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

  public onChangeValue(value: string) {
    console.log(value);
  }
}
