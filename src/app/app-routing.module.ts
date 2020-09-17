import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './data/auth.guard';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent, canActivate : [AuthGuard] },
  { path: 'home/:id', component: HomeComponent, canActivate : [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
 