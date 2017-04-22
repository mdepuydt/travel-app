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
  classes: Array<string> = ['hideMap'];

  posts: number = 2;
  page: number = 1;
  total: number;

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
    this.articleService.getPageArticles(this.page, this.posts)
      .then((articles) => {
        console.log(articles);
        this.articles = articles;
        this.total = this.articleService.getTotal();
        // this.articles.forEach(
        //   (art) => {
        //     if (art.compressedPhotos) {
        //       for (let i = 0; i < art.compressedPhotos.length; i++) {
        //         art.photos.push(LZString.decompress(art.compressedPhotos[i]));
        //       }
        //     }
        //   }
        // )
      });
  }

  private clear() {
    this.currentUser = {
      'username': '',
      'password': ''
    }
  }



}
