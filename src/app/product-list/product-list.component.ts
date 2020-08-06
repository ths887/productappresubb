import { Component, OnInit } from '@angular/core';
import { ProductModel } from './product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title:String = "Product List";
  products:ProductModel[];
  imageWidth: number=50;
  imageMargin: number=2;
  showImage: boolean = false;
   constructor(private productService:ProductService,private router:Router){

   }
   toggleImage(): void{
     this.showImage = !this.showImage;
   }
   
   update(product){
    this.productService.setter(product);
     console.log('function called')
     this.router.navigate(['/update'])
   }
 
   delete(product){
     this.productService.delete(product)
     location.reload();
     
   } 

  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe((data)=>{
      this.products=JSON.parse(JSON.stringify(data));
    },
    (err)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status==500){this.router.navigate(['/login'])}
       }
    }
    )
  }



}
