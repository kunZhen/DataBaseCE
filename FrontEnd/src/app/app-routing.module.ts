import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChrisListComponent } from './components/pruebaChris/chris-list/chris-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'chrispage',
    component: ChrisListComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
/* `export class AppRoutingModule` is exporting the `AppRoutingModule` class so that it can be used in
other parts of the application. This allows other modules to import and use the routing
configuration defined in `AppRoutingModule`. */
export class AppRoutingModule { }
