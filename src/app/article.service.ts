import {Injectable} from '@angular/core';
import 'rxjs/add/operator/share';
import {Article} from './article';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

const URL = 'http://localhost:3000/articles';

@Injectable()
export class ArticleService {

  constructor(private http: Http) {
  }

  getArticles(): Promise<Article[]> {
    return this.http.get(`${URL}`).toPromise().then(response => response.json());
  }

  getArticle(id: number): Promise<Article> {
    return this.http.get(`${URL}/${id}`).toPromise().then(response => response.json());
  }

  save(article: Article): Promise<Article> {
    return article.id
      ? this.http.put(`${URL}/${article.id}`, article).toPromise().then(response => response.json())
      : this.http.post(`${URL}`, article).toPromise().then(response => response.json());
  }

  remove(id: number): Promise<void> {
    console.log(id);
    return this.http.delete(`${URL}/${id}`).toPromise();
  }


}
