import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit
{
  productForm: FormGroup;
  loading = false; 
  constructor(private formBuilder: FormBuilder,private router: Router,
    private productService: ProductService,public snackBar: MatSnackBar) { }
 
  ngOnInit(): void 
  {
    this.productForm = this.formBuilder.group
    ({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['',Validators.required],
      color: [''],
      category: ['', Validators.required],
    });
  }
  onFileChange(event) 
  {
    if (event.target.files.length > 0) 
    {
      //check file is valid
      if (!this.validateFile(event.target.files[0].name)) 
      {
        console.log('Selected file format is not supported');
        document.getElementById("file_error").innerHTML="Please Enter Valid File";
        return false;
      }
      document.getElementById("file_error").innerHTML="";
      const file = event.target.files[0];
      this.productForm.get('image').setValue(file);
      this.productForm.patchValue(
      {
        image: file
      });
    }
  }
  validateFile(name: String) 
  {
    var ext = name.substr(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' ||ext.toLowerCase() == 'jpeg') 
    {
      return true;
    }
  }
  validateName(){
    var name = (<HTMLInputElement>document.getElementById('name')).value;
    if (name == null || name == "") 
    {
      document.getElementById("name_error").innerHTML="Please Enter Product Name";
      return false;
    } 
    // if (desc == "" || desc == null)
    // {
    //   document.getElementById("desc_error").innerHTML="Please Enter Description";
    //   return false;
    // }
    document.getElementById("name_error").innerHTML="";
    return true;
   
  }	
	ValidateDecs() {
    var desc = (<HTMLInputElement>document.getElementById('desc')).value;
    if (desc == "" || desc == null ){
      document.getElementById('desc').focus();
      document.getElementById("desc_error").innerHTML="Please Enter Description";
      return false;
    }
    if(desc.length <= 50 && desc.length >=5){ 
      console.log(desc.length)
      document.getElementById("desc_error").innerHTML="";
      return true;
    }
      document.getElementById('desc').focus();
      document.getElementById("desc_error").innerHTML="make sure the input is between 5-50 characters long";
      return false;  
  }
  onSubmit(){   
    const formData = new FormData();
    Object.entries(this.productForm.value).forEach(
      ([key, value]: any[]) => 
      {
        formData.set(key, value);
      })
    this.productService.registerProduct(formData).subscribe(
      data => {
        this.snackBar.open("form submitted successfully",'',{
          duration:3000,
          verticalPosition:'top'
      });
        this.router.navigate(['/'], { fragment: 'featured-menu' });
      },  
      error => 
      {
          console.log("error")
      });
  }
}
