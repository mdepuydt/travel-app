import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import  {Article} from '../article';
import {ArticleService} from '../article.service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {

  articles: Article[] = [];

  constructor(private articleService: ArticleService,
              private router: Router) {

  }

  ngOnInit() {
    //this.articles = this.route.snapshot.data['articles'];
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


}
