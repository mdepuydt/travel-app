import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  AfterContentChecked,
  AfterContentInit,
  OnChanges
} from '@angular/core';
import {Router} from '@angular/router';

import {Article, Geolocation} from '../article';
import {ArticleService} from '../article.service';
import {AuthentificationService} from '../authentification.service';

import {User} from '../user';

declare var LZString: any;
declare var google: any;


@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {

  public zoom: number;
  currentUser: User;
  articles: Article[] = [];
  showMapId: number;
  classes: Array<string> = ['hideMap'];

  constructor(private articleService: ArticleService,
              private authService: AuthentificationService,
              private router: Router) {
    this.clear();

  }

  ngOnInit() {
    this.authService.updates().subscribe((user) =>
      this.currentUser = user);
    this.fetchArticles();
    this.zoom = 8;
  }

  remove(id: number) {
    this.articleService.remove(id).then(art => {
        this.fetchArticles();
      }
    );
  }

  edit(article: Article) {
    this.router.navigate(['/edit']);
  }

  private fetchArticles(): Promise<Article[]> {
    return this.articleService.getArticles()
      .then(articles => {
        this.articles = articles;
        this.articles.forEach(
          (art) => {
            if (art.compressedPhotos) {
              for (let i = 0; i < art.compressedPhotos.length; i++) {
                art.photos.push(LZString.decompress(art.compressedPhotos[i]));
              }
            }
          }
        )
      });
  }

  private clear() {
    this.currentUser = {
      'username': '',
      'password': ''
    }
  }

  showMap(id: number, location: Geolocation) {
    this.classes = ['showMap'];
    this.showMapId = id;
    let mapOptions = {
      center: new google.maps.LatLng(location.latitude, location.longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    let map = new google.maps.Map(document.getElementById("googleMap" + id), mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.latitude, location.longitude),
      map: map,
      title: 'Hello World!'
    });
  }



}
