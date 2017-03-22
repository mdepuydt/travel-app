import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ArticleService} from '../article.service';
import {AuthentificationService} from '../authentification.service';

import {Article} from  '../article';
import {User} from '../user';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  article: Article;
  id: number;
  private sub: any;
  currentUser: User;


  constructor(private articleService: ArticleService,
              private authService: AuthentificationService,
              private router: Router,
              private route: ActivatedRoute) {
    //this.clearUser();
  }

  ngOnInit() {
    //console.log(this.route.params);
    //console.log(this.route.params["id"]);
    this.clear();
    // if (this.route.params["id"] != undefined) {
    //   console.log("true");
    //   this.id = +this.route.params["id"];
    //   console.log(this.id);
    //   this.articleService.getArticle(this.id).then(
    //     art => this.article = art
    //   );
    // }
    this.authService.updates().subscribe((user) => {
      this.currentUser = user;
      console.log(user);
    });

    this.sub = this.route.params.subscribe(params => {

      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      if (!isNaN(this.id)) {
        this.articleService.getArticle(this.id).then(
          art => this.article = art
        );
      }

    });
  }

  clear() {
    this.article = {
      title: '',
      content: '',
      creationDate: ''
    }
  }

  save(article) {
    this.article.creationDate = (new Date()).toJSON();
    this.articleService.save(article).then(art =>
      this.router.navigate(['/list'])
    );
  }

  handleInputChange(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.article.photos = new Array<string>();
      let reader = new FileReader();
      reader.onload = function (e: any) {
        document.getElementById('preview').setAttribute('src', e.target.result);
      };
      for (var i = 0; i < fileInput.target.files.length; i++) {
        this.article.photos.push(fileInput.target.files[i].name);
      }
      console.log(fileInput.target.files.length);
      console.log(fileInput.target.files[0]);
      console.log(fileInput.target.files[0].name);
      reader.readAsDataURL(fileInput.target.files[0]);
    }

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private clearUser() {
    this.currentUser = {
      'username': '',
      'password': ''
    }
  }


}
