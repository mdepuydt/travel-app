import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AgmCoreModule} from "@agm/core";
import {AppRoutingModule} from './app-routing.module';

import {ArticleService} from './services/articles/article.service';
import {AuthenticationService} from './services/authentication/authentication.service';
import {UsersService} from './services/followers/users.service';
import {GeolocationService} from './services/geolocation/geolocation.service';
import {PhotosService} from './services/photos/photos.service';

import { AppComponent } from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {ListArticlesComponent} from './list-articles/list-articles.component';
import {EditArticleComponent} from './edit-article/edit-article.component';
import {AuthenticationComponent} from './authentification/authentification.component';
import {MapComponent} from './map/map.component';
import {LoadingWheelComponent} from './loading-wheel/loading-wheel.component';
import { HomeComponent } from './components/home/home.component';
import {ForbiddenComponent} from './components/forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ListArticlesComponent,
    EditArticleComponent,
    AuthenticationComponent,
    MapComponent,
    LoadingWheelComponent,
    HomeComponent,
    ForbiddenComponent
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
    AuthenticationService,
    UsersService,
    GeolocationService,
    PhotosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
