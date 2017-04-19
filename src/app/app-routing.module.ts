import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListArticlesComponent} from './list-articles/list-articles.component';
import {EditArticleComponent}   from './edit-article/edit-article.component';
import {AuthentificationComponent} from './authentification/authentification.component';
import {MapComponent} from './map/map.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
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
    component: AuthentificationComponent
  },
  {
    path: 'map',
    component: MapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
