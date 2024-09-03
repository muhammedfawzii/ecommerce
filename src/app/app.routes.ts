import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailsComponent } from './components/details/details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';

export const routes: Routes = [
    {path: "" , component:BlankLayoutComponent, canActivate:[authGuard], children:[
        {path:"", redirectTo:'home', pathMatch:"full"},
    {path:'home', component: HomeComponent , title:'home'},
    {path:'product', component:ProductComponent, title:'product'},
    {path: 'categories', component: CategoriesComponent, title:'categories'},
    {path:'cart', component:CartComponent, title:'cart'},
    {path:'wishlist', loadComponent:()=>import('./components/wishlist/wishlist.component').then((c)=>c.WishlistComponent), title:'wishlist'},
    {path: 'brands', loadComponent:()=>import('./components/brands/brands.component').then((c)=>c.BrandsComponent), title:'brands'},
    {path: 'details/:id', component:DetailsComponent},
    {path: 'allorders', loadComponent:()=> import('./components/allorders/allorders.component').then((c)=>c.AllordersComponent), title:'allorders'},
    {path: 'orders/:id',component:OrdersComponent , title:'orders'},
    ]},

    {path:"", component:AuthLayoutComponent, canActivate:[loggedGuard], children:[
        {path:"", redirectTo:'register', pathMatch:'full'},
        {path:'register', component:RegisterComponent, title:'register'},
        {path:'login', component:LoginComponent, title:'login'},
        {path:'forgot', component:ForgotPasswordComponent, title:'forgotPassword'}
    ]},
    {path:"**", loadComponent:()=>import('./components/not-found/not-found.component').then((c)=>c.NotFoundComponent)}
    
];
