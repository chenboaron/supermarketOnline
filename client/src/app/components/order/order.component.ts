import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart-service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public sumPrice: number;

  public userDetailsForm: FormGroup;
  public creditCard: FormControl;
  public city: FormControl;
  public street: FormControl;

  constructor(public cartService: CartService, public router: Router) { }

  ngOnInit(): void {
    this.sumPrice = 0;

    this.creditCard = new FormControl("", [Validators.required, Validators.pattern("[0-9]{16}$")]);
    this.city = new FormControl("", Validators.required);
    this.street = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]{1,15}")]);

    // Initializing the from group
    this.userDetailsForm = new FormGroup({
      userId: this.creditCard,
      city: this.city,
      street: this.street,
    });



    let observableOfCart = this.cartService.getCart();

    observableOfCart.subscribe(allCartItemsFromServer => {
      this.cartService.allCartItems = allCartItemsFromServer;

      this.calculatPrice();

    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }

  public calculatPrice() {
    this.sumPrice = 0;
    for (let index = 0; index < this.cartService.allCartItems.length; index++) {
      this.sumPrice = this.sumPrice + this.cartService.allCartItems[index].totalPrice;
    }

  }
  public order() {

  }

}
