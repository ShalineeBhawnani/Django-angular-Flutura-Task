import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
declare var $;

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  @ViewChild("dataTable", { static: true }) table: any;
  ngAfterViewInit() {
    this.table.nativeElement;
  }
  dataTable: any;
  dtOptions: any = {};
  userdata
  property_list:[]
  product_list:[]
  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.Property();
    this.onSelectsAll()
    
    }
  DataTable(){
    this.dtOptions = {
      "pagingType": "full_numbers",
      "lengthMenu": [ 5,10,15], 
      "pageLength": 5,
      
        // "processing": true,
        // "ajax": {
        //     "processing": true,
        //     "url": "{% url 'property' %}",
        //     "dataSrc": ""
        // },


      };
      $(()=>{  
    $('table.myTable').DataTable(this.dtOptions);

      
    });
  }
  Property(){
    
    this.userService.getProperty().subscribe(
      data => {
        this.property_list = data;
        console.log(this.product_list)
      },
      
      error => {
        console.log(error);
      }
    );
  }
  onSelects(property){
    if ($('table.myTable').DataTable()) {
      var table =$('table.myTable').DataTable();
      console.log($.fn.dataTable.version);
      table.destroy();
      table.clear();
    }
    this.userService.getAllSelectedProduct(property.id).subscribe(
      data => {
        this.product_list = data;   
        console.log(this.product_list)
        this.DataTable()
      },
      error => {
        console.log(error);
      }
    );
}
onSelectsAll(){
  if ($('table.myTable').DataTable()) {
    var table =$('table.myTable').DataTable();
    table.destroy();
    table.clear();
  }
  this.userService.getAllProduct().subscribe(
    data => {
      this.product_list = data;
      this.DataTable()
;    }, 
    error => {
      console.log(error);
    }
  );
}
myColor(){
    $('li a').click(function(e) {
      e.preventDefault();
      $('a').removeClass('active');
      $(this).addClass('active');
  });
}
}