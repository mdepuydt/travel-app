import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AgmCoreModule} from "@agm/core";
import {AppRoutingModule} from './app-routing.module';

import {ArticleService} from './article.service';
import {AuthentificationService} from './authentification.service';
import {UsersService} from './users.service';
import {GeolocationService} from './geolocation.service';

import { AppComponent } from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {ListArticlesComponent} from './list-articles/list-articles.component';
import {EditArticleComponent} from './edit-article/edit-article.component';
import {AuthentificationComponent} from './authentification/authentification.component';
import {MapComponent} from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ListArticlesComponent,
    EditArticleComponent,
    AuthentificationComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDZ2S6cgODh7I-nqZI0b-_oNgsZrXsOjA0",
      libraries: ["places"]
    }),
  ],
  providers: [
    ArticleService,
    AuthentificationService,
    UsersService,
    GeolocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
