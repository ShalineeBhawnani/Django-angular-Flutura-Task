import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userdata
  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.UserInfo()
    
  }
  classToggle() {
    console.log("here")
    const navs = document.querySelectorAll('.navbar__items')
    navs.forEach(nav => nav.classList.toggle('navbar__ToggleShow'));
  }
  classSecondToggle(){
    console.log("here second")
    const navs = document.querySelectorAll('.Navbar__Items')
    navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
  
  }
  UserInfo(){
    
    this.userService.getUserInfo().subscribe(
      data => {this.userdata = data;
        this.userdata = Array.of(this.userdata); 
      },
      error => {
        console.log(error);
      }
    );
  }
}
