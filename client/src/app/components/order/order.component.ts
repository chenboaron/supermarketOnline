import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart-service';
import { OrderService } from 'src/app/services/orderService';
import { Order } from 'src/app/models/Order';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public sumPrice: number;

  public orderDetailsForm: FormGroup;
  public creditCard: FormControl;
  public city: FormControl;
  public street: FormControl;
  public date: FormControl;

  public orderDetails : Order;

  constructor(public orderService: OrderService, public cartService: CartService, public router: Router) { }

  ngOnInit(): void {
    this.sumPrice = 0;
    this.orderDetails = new Order();

    this.creditCard = new FormControl("", [Validators.required, Validators.pattern("[0-9]{16}$")]);
    this.city = new FormControl("", Validators.required);
    this.street = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]{1,15}")]);
    this.date= new FormControl("", Validators.required);

    // Initializing the from group
    this.orderDetailsForm = new FormGroup({
      userId: this.creditCard,
      city: this.city,
      street: this.street,
      date:  this.date,
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
    this.orderDetails.city = this.city.value;
    this.orderDetails.street = this.street.value;
    this.orderDetails.creditCard = this.creditCard.value;
    this.orderDetails.date = this.date.value;
    

    let observable = this.orderService.order(this.orderDetails);

    observable.subscribe(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your purchase was successful!',
        html:
        '<b>To download the receipt</b>, ' +
        '<a href="//sweetalert2.github.io"> click here</a> ',
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(["/customer"]);
        }
      })
      
    }, error => {
      alert('Failed to order ' + JSON.stringify(error));
    });
    
  }

}
