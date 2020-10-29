import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

import { MessengerService } from 'src/app/services/messenger.service'
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  category_list:[]
  subcategory_list:[]
  // product_list:[]
  product_list: Product[] = []
  id: number;
  user;
  constructor(private msg: MessengerService,
    private router: Router,
    private productService: ProductService,
    ) {}

  ngOnInit(): void {
    this.getAllCategory()
  }

  handleAddToCart(product) {
   let data= {

    // price: product.price,
    // quantity: 1,
    // user: 1,
    product: product.id,

    }
    console.log("data to send in cart",data)
    this.productService.addProductToCart(product.id).subscribe(() => {
      this.msg.sendMsg(product.id)
      })
    }

  onSelect(category){
    console.log("category id",category.id)
    this.productService.categoryList(category.id).subscribe(
      data => {
        this.subcategory_list = data;
      },
      
      error => {
        console.log(error);
      }
    );
    }
  onSelects(subcategory){
    console.log("subcategory id",subcategory.id)
    this.productService.getAllSelectedProduct(subcategory.id).subscribe(
      data => {
        this.product_list = data;
      },
      
      error => {
        console.log(error);
      }
    );
  }
  getAllCategory(){
    this.productService.getAllCategory().subscribe(
    data => {
      console.log(data)
      this.category_list = data;
    },
    
    error => {
      console.log(error);
    }
  );
}

}
