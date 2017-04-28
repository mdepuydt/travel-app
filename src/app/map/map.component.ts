import {Component, OnInit} from '@angular/core';
import {Geolocation} from '../article';
import {ArticleService} from '../article.service';
import {Article} from '../article';

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public loading: boolean;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public locations: Array<{latitude: number, longitude: number, title: string, photo: string, creationDate: string}>;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.loading = true;
    this.latitude = 0.0000;
    this.longitude = 0.0000;
    this.zoom = 2;
    this.locations = Array<{latitude: number, longitude: number, title: string, photo: string, creationDate: string}>();

    this.articleService.getArticles().then(
      articles => {
        articles.forEach(
          (art) => {
            this.locations.push({
              'latitude': art.location.latitude,
              'longitude': art.location.longitude,
              'title': art.title,
              'photo': art.photos[0],
              'creationDate': art.creationDate
            })
          }
        );
        this.loading = false;
      }
    )
  }

}
