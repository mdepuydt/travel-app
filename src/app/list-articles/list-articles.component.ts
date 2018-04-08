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

import {Article, Geolocation} from '../interfaces/article';
import {ArticleService} from '../services/articles/article.service';
import {AuthenticationService} from '../services/authentication/authentication.service';

import {User} from '../interfaces/user';
import {PhotosService} from "../services/photos/photos.service";

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {

  public zoom: number;
  public loading: boolean;
  currentUser: User;
  articles: Article[] = [];
  classes: Array<string> = ['hideMap'];
  _end = false;
  _loadingNextPosts = false;

  posts: number = 5;
  page: number = 1;
  total: number;

  constructor(private articleService: ArticleService,
              private authService: AuthenticationService,
              private photoService: PhotosService,
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

  nextPage() {
    // No need to load next page if the end is already reached
    if (this._end == false) {
      this._loadingNextPosts = true;
      console.log('Load next page');
      this.page++;
      this.articleService.getPageArticles(this.page, this.posts).then(
        articles => {
          console.log('Yuhou');
          this._loadingNextPosts = false;
          if (articles.length > 0) {
            articles.forEach(art => {
              this.articles.push(art);
              this.photoService.getPhoto(art.photoName)
                .then(photo => {
                  document.getElementById('mainPhoto_' + art.id).setAttribute('src', photo);
                })
            });
          } else {
            this._end = true;
          }
          console.log(this.articles);
        }
      )
    }
  }

  private fetchArticles() {
    this.articles = [];
    this.loading = true;
    this.articleService.getPageArticles(this.page, this.posts)
      .then((articles) => {
        console.log(articles);
        this.articles = articles;
        this.total = this.articleService.getTotal();
        this.articles.forEach(article => {
          console.log(article.photoName);
          this.photoService.getPhoto(article.photoName).then(photo => {
            document.getElementById('mainPhoto_' + article.id).setAttribute('src', photo);
            //article.photos[0] = photo
          })
        });
        this.loading = false;
      });
  }

  private clear() {
    this.currentUser = {
      'username': '',
      'password': ''
    }
  }



}
