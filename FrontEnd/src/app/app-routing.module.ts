import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChrisListComponent } from './components/pruebaChris/chris-list/chris-list.component';

const routes: Routes = [
  {
    path: '',
    component: ChrisListComponent
  },
  {
    path: 'chrispage',
    component: ChrisListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
