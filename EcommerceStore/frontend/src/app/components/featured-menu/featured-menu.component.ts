import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { SwiperConfigInterface} from 'ngx-swiper-wrapper';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-featured-menu',
  templateUrl: './featured-menu.component.html',
  styleUrls: ['./featured-menu.component.scss']
})
export class FeaturedMenuComponent implements OnInit {
  category_list:[];
  product_list:[];
  DateSelection: FormGroup;
  selectedDaterange;
 
  constructor(private productService: ProductService,private formBuilder: FormBuilder,) { }
 
  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    observer:true,
    slidesPerView: 4,
    scrollbar: 
    {
      el: '.swiper-scrollbar',
      hide: false,
      draggable: true,
    },
    navigation: 
    {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints:
    {
      320:
      {
        slidesPerView: 1, 
      }
    }
  };
  ngOnInit() 
  {
    this.allSelect()
    this.onSelectLatest()
    this.DateSelection = this.formBuilder.group
    ({
      start: [null, Validators.required],
      end : [null, Validators.required],
    });
  }
  
  onSelectCat(category) 
  {
    console.log(category)
    const start = new Date(this.DateSelection.controls['start'].value).toISOString();
    const end = new Date(this.DateSelection.controls['end'].value).toISOString();
    this.productService.getSelectedProduct(category,start,end).subscribe(
      data => {
        this.product_list = data;
      });
      // this.DateSelection.reset();
  }
  allSelect(){
    this.productService.getAllCategory().subscribe(
      data => {
        this.category_list = data;
      });
  }
  onSelectLatest(){
    this.productService.getSelectedProduct(undefined,undefined,undefined).subscribe(
      data => {
        this.product_list = data;
      });
  }
}
