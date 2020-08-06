import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { UpdateProductComponent } from './update-product/update-product.component';


const routes: Routes = [{path:'',component:ProductListComponent,canActivate: [AuthGuard]},
{path:'add',component:NewProductComponent,canActivate: [AuthGuard]},
{path:'update',component:UpdateProductComponent,canActivate: [AuthGuard]},
{path:'login',component:LoginComponent},
{path: 'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
