import {Component, OnInit, NgZone, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ArticleService} from '../article.service';
import {AuthentificationService} from '../authentification.service';
import {GeolocationService} from '../geolocation.service';

import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Article, Geolocation} from  '../article';
import {User} from '../user';
import {saveAs} from 'file-saver';

import {MapsAPILoader} from '@agm/core';

//declare var google: any;
declare var location: any;

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  photos: Array<string> = new Array<string>();
  article: Article;
  address: string;
  id: number;
  anotherDate = false;
  anotherLocation = false;
  private sub: any;
  currentUser: User;
  tmpLocation: Geolocation;
  _imageTooBig = false;


  constructor(private articleService: ArticleService,
              private authService: AuthentificationService,
              private geolocationService: GeolocationService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private router: Router,
              private route: ActivatedRoute) {
  }

  @ViewChild("search")
  public searchElementRef: ElementRef;

  ngOnInit() {
    this.clear();
    this.authService.updates().subscribe((user) => {
      this.currentUser = user;
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (!isNaN(this.id)) {
        this.articleService.getArticle(this.id).then(
          art => this.article = art
        );
      }
    });

    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  clear() {
    this.article = {
      title: '',
      content: '',
      creationDate: '',
      location: {}
    }
  }

  onSave() {

    if (!this._imageTooBig) {
      this.save();
    } else {

    }


  }

  onPickAnotherDate() {
    this.anotherDate = true;
  }

  handleInputChange(fileInput) {
    this._imageTooBig = false;
    this.photos = [];
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log(fileInput.target.files[0]);
      if (fileInput.target.files[0].size < 3000000) {
        let index = 0;
        for (let i = 0; i < fileInput.target.files.length; i++) {
          let reader = new FileReader();
          this.photos.push(i.toString());
          reader.onloadend = function (e: any) {
            console.log(index.toString());
            document.getElementById(index.toString()).setAttribute('src', e.target.result);
            index++;
          };
          reader.readAsDataURL(fileInput.target.files[i]);
        }
      } else {
        console.log("true");
        this._imageTooBig = true;
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private err() {
    console.log("Error");
  }
  private clearUser() {
    this.currentUser = {
      'username': '',
      'password': ''
    }
  }

  private save() {
    if (!this.article.creationDate) {
      this.article.creationDate = (new Date()).toJSON();
    }
    this.article.location.latitude = this.latitude;
    this.article.location.longitude = this.longitude;
    this.article.photos = new Array<string>();
    if (this.photos) {
      this.photos.forEach(
        (el) => {
          let Pic = document.getElementById(el).getAttribute('src');
          this.article.photos.push(Pic);
        }
      );
    }
    this.articleService.save(this.article).then(art =>
      this.router.navigate(['/list'])
    );
  }





}
