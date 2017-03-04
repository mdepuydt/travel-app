import {Component, OnInit} from '@angular/core';

import  {Article} from '../article';
import {ArticleService} from '../article.service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {

  articles: Article[];

  constructor(private articleService: ArticleService) {

  }

  ngOnInit() {
    this.articles = this.articleService.getArticles();
  }


}
