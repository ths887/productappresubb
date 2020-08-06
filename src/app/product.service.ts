import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from './product-list/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   private product:ProductModel;


  constructor(private http:HttpClient) { }
  getProducts(){
    return this.http.get("http://localhost:5500/products");
  }
  newProduct(item){
    return this.http.post("http://localhost:5500/insert",{"product":item})
    .subscribe(data=>{console.log(data)})
  }
  updateProduct(item)
  {
    return this.http.post("http://localhost:5500/update",{"product":item})
    .subscribe(data=>{console.log(data)})

  }

  setter(product){
    console.log("settercalled")

    this.product=product;
    console.log(product);
  }
  hi(){
    return this.product;
  }

  delete(products){
    console.log("delete clicked")
    return this.http.post("http://localhost:5500/delete",{"product":products})
    .subscribe(data=>{console.log(data)})
  }
}
