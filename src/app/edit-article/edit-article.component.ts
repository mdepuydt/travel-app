import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ArticleService} from '../article.service';
import {Article} from  '../article';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent implements OnInit {

  article: Article;

  constructor(private articleService: ArticleService,
              private router: Router) {
  }

  ngOnInit() {
    this.clear();
  }

  clear() {
    this.article = {
      title: '',
      content: ''
    }
  }

  save(article) {
    this.articleService.save(article);
    this.router.navigate(['/list']);
  }

  handleInputChange(e) {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    const pattern = /image-*/;
    let reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    //this.loaded = false;

    //reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

}
