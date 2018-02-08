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

  posts: number = 1;
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

  newerPosts() {
    if (this.page > 1) {
      this.page--;
      this.fetchArticles();
    }
  }

  olderPosts() {
    this.page++;
    this.fetchArticles();
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
            document.getElementById('mainPhoto').setAttribute('src', photo);
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
