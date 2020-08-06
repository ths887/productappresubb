import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product-list/product.model';
import { ProductService } from '../product.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productItem = new ProductModel(null,null,null,null,null,null,null,null);
  
  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.productItem = this.productService.hi();
  }
  
  updateProduct(){
    this.productService.updateProduct(this.productItem)
    console.log("hi for, editproduct and the corresponding product name is " + this.productItem.productName);
    alert("updated")
    this.router.navigate(['/'])
  }
}
