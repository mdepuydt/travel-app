import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListArticlesComponent} from './list-articles/list-articles.component';
import {EditArticleComponent}   from './edit-article/edit-article.component';
import {AuthenticationComponent} from './authentification/authentification.component';
import {MapComponent} from './map/map.component';
import {HomeComponent} from './components/home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListArticlesComponent
  },
  {
    path: 'edit/:id',
    component: EditArticleComponent
  },
  {
    path: 'edit',
    component: EditArticleComponent
  },
  {
    path: 'auth',
    component: AuthenticationComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
