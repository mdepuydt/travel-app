import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Article} from '../article';
import {ArticleService} from '../article.service';
import {AuthentificationService} from '../authentification.service';

import {User} from '../user';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {

  currentUser: User;
  articles: Article[] = [];

  constructor(private articleService: ArticleService,
              private authService: AuthentificationService,
              private router: Router) {
    this.clear();
  }

  ngOnInit() {
    this.authService.updates().subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
    this.fetchArticles();
  }

  remove(id: number) {
    this.articleService.remove(id).then(art => {
        this.fetchArticles();
        console.log(this.articles);
      }
    );
  }

  edit(article: Article) {
    this.router.navigate(['/edit']);
  }

  private fetchArticles(): Promise<Article[]> {
    return this.articleService.getArticles()
      .then(articles => this.articles = articles);
  }

  private clear() {
    this.currentUser = {
      'username': '',
      'password': ''
    }
  }


}
