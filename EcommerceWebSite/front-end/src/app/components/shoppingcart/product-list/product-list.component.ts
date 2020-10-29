import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { MessengerService } from 'src/app/services/messenger.service'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  product_list: Product[] = []
  
  // id: number;
  // name: string;
  // slug: string;
  // price: number;
  // available:boolean=true;
  // description: string;
  // picture:any;
  // category 
  
  constructor(private msg: MessengerService,
  private router: Router,
  private productService: ProductService,
  )  {
    
    }

  ngOnInit(): void {
    this.getAllProducts()
  }

  handleAddToCart(product) {
    let cart_data = {
      id: product.id,
      name: product.name,
    }
    console.log("data to send in cart",cart_data)
    this.productService.addProductToCart(cart_data).subscribe(() => {
      this.msg.sendMsg(cart_data)
      })
    }

  getAllProducts(){
      this.productService.getAllProduct().subscribe(
      (data) => {
        this.product_list = data;
        console.log("product",this.product_list=data)
      },
      
      error => {
        console.log(error);
      }
    );
  }
}
