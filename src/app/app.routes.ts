import { Routes } from '@angular/router';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailsComponent } from './components/details/details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
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
    {path:'wishlist', component:WishlistComponent, title:'wishlist'},
    {path: 'brands', loadComponent:()=>import('./components/brands/brands.component').then((c)=>c.BrandsComponent), title:'brands'},
    {path: 'details/:id', component:DetailsComponent},
    {path: 'allorders', component:AllordersComponent},
    {path: 'orders/:id', component:OrdersComponent},
    ]},

    {path:"", component:AuthLayoutComponent, canActivate:[loggedGuard], children:[
        {path:"", redirectTo:'register', pathMatch:'full'},
        {path:'register', component:RegisterComponent, title:'register'},
        {path:'login', component:LoginComponent, title:'login'},
        {path:'forgot', component:ForgotPasswordComponent, title:'forgotPassword'}
    ]},
    {path:"**", component:NotFoundComponent}
    
];
