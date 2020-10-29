import { NgModule } from '@angular/core';
import { ProductFormComponent } from '../components/product-form/product-form.component';
import { ProductFormRoutingModule } from './product-form-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductFormComponent],
  imports: [
    ProductFormRoutingModule,
    SharedModule,  
  ]
})
export class ProductFormModule { }
