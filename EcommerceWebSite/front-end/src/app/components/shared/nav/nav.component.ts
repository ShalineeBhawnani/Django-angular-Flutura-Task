import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  username
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    
    this.username = localStorage.getItem('token');
  }
  cartItems(){
    console.log("here")
    this.router.navigate(['/cart'])
 
  }
}
