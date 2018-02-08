import {Injectable} from '@angular/core';
import 'rxjs/add/operator/share';
import {Article} from '../../interfaces/article';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../../environments/environment';

const URL = 'http://' + environment.host + ':' + environment.port + '/api';

@Injectable()
export class ArticleService {

  _total: number;

  getTotal(): number {
    if (this._total) {
      return this._total;
    }
  }

  constructor(private http: Http) {
  }

  getArticles(): Promise<Article[]> {
    return this.http.get(`${URL}/articles`).toPromise().then(response =>
      response.json());
  }

  getPageArticles(page: number, limit: number): Promise<Article[]> {
    const start = (page - 1) * limit;
    return this.http.get(`${URL}/articles`).toPromise().then(response => {
      //console.log(response.headers.get('X-total-count'));
      //this._total = parseInt(response.headers.get('X-total-count'));
      return response.json();
    });
  }

  getArticle(id: number): Promise<Article> {
    return this.http.get(`${URL}/article/${id}`).toPromise().then(response => response.json());
  }

  save(article: Article): Promise<Article> {
    return article.id
      ? this.http.put(`${URL}/article/${article.id}`, article).toPromise().then(response => response.json())
      : this.http.post(`${URL}/article`, article).toPromise().then(response => response.json());
  }

  remove(id: number): Promise<void> {
    console.log(id);
    return this.http.delete(`${URL}/article/${id}`).toPromise();
  }

  savePhoto(photo: any) {
    console.log(photo);
    this.http.post(`${URL}`, photo).toPromise().then(response => response.json());
  }


}
