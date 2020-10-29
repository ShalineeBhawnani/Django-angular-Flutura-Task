import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  constructor(  
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', Validators.required],
      property: ['', Validators.required],
      service: ['', Validators.required],
      message: [''],
      
  });
  }
onSubmit() {
    if (this.registerForm.invalid) {
      return;
  }
  this.userService.register(this.registerForm.value).subscribe(
          data => {
              console.log("registerd",data)
              alert("form submmited successfully")
              this.registerForm.reset();
          },
          error => {
              console.log("error")
          });
}
validate(){
  var regName = /^[a-z]*$/i;
  var name = (<HTMLInputElement>document.getElementById('name')).value;
  if (name == null || name == "") {
    document.getElementById('name').focus();
    document.getElementById("name_error").innerHTML="Please Enter Name";
    return false;
} 
  if(!regName.test(name)){
      document.getElementById('name').focus();
      document.getElementById("name_error").innerHTML="Please Enter Letters Only ";
      return false;
  }
  else{
      document.getElementById("name_error").innerHTML="";
      return true;
  }
}
ValidateNo() {
  var phoneNo = (<HTMLInputElement>document.getElementById('phone_number')).value;
  if (phoneNo == "" || phoneNo == null ) {
    document.getElementById('phone_number').focus();
    document.getElementById("phone_error").innerHTML="Please Enter Mobile No";
    return false;
  }
  if (phoneNo.length < 5) {
    document.getElementById('phone_number').focus();
    document.getElementById("phone_error").innerHTML="Please Enter 5 Digit Mobile No";
    return false;
  }
  document.getElementById("phone_error").innerHTML="";
  return true;
}
ValidateEmail() {
  var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var email = (<HTMLInputElement>document.getElementById('email')).value;

  if (email == "" || email == null ) {
    document.getElementById('email').focus();
    document.getElementById("email_error").innerHTML="Please Enter Email";
    return false;
  }
  if (!reg.test(email)){
    document.getElementById('email').focus();
    document.getElementById("email_error").innerHTML="Please Enter valid Email";
    return false;
  }
  document.getElementById("email_error").innerHTML="";
  return true;
}

}