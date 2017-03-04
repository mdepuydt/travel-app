import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListArticlesComponent} from './list-articles/list-articles.component';
import {EditArticleComponent}   from './edit-article/edit-article.component';


const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'list', component: ListArticlesComponent},
  {path: 'edit', component: EditArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
