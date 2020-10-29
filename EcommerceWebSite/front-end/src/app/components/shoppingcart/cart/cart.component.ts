import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { MessengerService } from 'src/app/services/messenger.service'
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = [];
  cartTotal = 0

  constructor(private router: Router,
    private productService: ProductService,
    private msg: MessengerService,)  {
    this.getCart()
  }

  ngOnInit(): void {
    this.handleSubscription();
    this.getCart();
  }

  handleSubscription() {
    
    this.msg.getMsg().subscribe((product: Product) => {
      console.log("cart_product",product)
      this.getCart();

    })
  }
  
  getCart=()=>{

    this.productService.getAllCartProduct().subscribe(
      (data: CartItem[]) => {
        this.cartItems = data;
        this.calcCartTotal();
      },
      error => {
        console.log(error);
      }
    );
  }
  calcCartTotal() {
    this.cartTotal = 0
    this.cartItems.forEach(data => {
      this.cartTotal += (data.quantity * data.price)
    })
  }
}
