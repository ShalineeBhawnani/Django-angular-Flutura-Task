import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard'
import { CartComponent } from './components/shoppingcart/cart/cart.component'
const routes: Routes = [

  {
    path      : '',
    pathMatch : 'full',
    redirectTo: 'login',
  },
  {
      path:'home',
      component:HomeComponent,
  },
  {
      path:'login',
      component:LoginComponent,
  },
  {
    path:'register',
    component: RegistrationComponent,
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard] // !!! HERE !!!
    
  },
  {
    path:'cart',
    component:CartComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
