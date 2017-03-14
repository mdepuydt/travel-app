import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AppRoutingModule} from './app-routing.module';

import {ArticleService} from './article.service';

import { AppComponent } from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {ListArticlesComponent} from './list-articles/list-articles.component';
import {EditArticleComponent} from './edit-article/edit-article.component';
import {ImageUploaderComponent} from './edit-article/image-uploader/image-uploader.component';

import * as FileSaver from 'file-saver';
import {AuthentificationComponent} from './authentification/authentification.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ListArticlesComponent,
    EditArticleComponent,
    ImageUploaderComponent,
    AuthentificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
