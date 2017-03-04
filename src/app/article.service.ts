import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import {Article} from './article';

@Injectable()
export class ArticleService {

  articles: Article[];

  constructor() {
    this.articles = [
      {
        title: "Test 1",
        content: "Tout va bien"
      },
      {
        title: "Test 2",
        content: "Toujours ok"
      }
    ];
  }

  getArticles() {
    return this.articles;
  }

  save(article) {
    console.log(article);
    this.articles.push(article);
    console.log(this.articles);
  }


}
