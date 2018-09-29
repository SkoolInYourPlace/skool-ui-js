import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'home'
  },
  {
    path: 'skool-ui-angular',
    pathMatch: 'prefix',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { preload: true, delay: false, title: 'Login' }
  },
  {
    path: 'details',
    component: SchoolDetailsComponent,
    data: { preload: true, delay: false, title: 'Login' }
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule]
})
export class AppRoutingModule {}