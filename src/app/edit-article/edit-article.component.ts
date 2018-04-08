import {Component, OnInit, NgZone, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl} from "@angular/forms";

// App Services
import {ArticleService} from '../services/articles/article.service';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {PhotosService} from '../services/photos/photos.service';

// App Interfaces
import {Article, Geolocation} from '../interfaces/article';
import {User} from '../interfaces/user';

// External libraries
import {saveAs} from 'file-saver';
import {MapsAPILoader} from '@agm/core';


@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  photos: Array<string> = new Array<string>();
  article: Article;
  id: number;
  anotherDate = false;
  private sub: any;
  currentUser: User;
  _imageTooBig = false;
  _errorLoadingImage = false;


  constructor(private articleService: ArticleService,
              private authService: AuthenticationService,
              private photoService: PhotosService,
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
          art => {
            this.article = art;
            //set current position
            this.setCurrentPosition();
          }
        );
      } else {
        this.article.creationDate = (new Date()).toISOString();
      }
    });

    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

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
    // In edit/update mode
    console.log('set current position');
    console.log(this.article);
    if (this.article.latitude && this.article.longitude) {
      this.latitude = this.article.latitude;
      this.longitude = this.article.longitude;
    } else { // In create
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
        });
      }
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
    }
    else {
      console.log("Impossible to save, image too big");
    }
  }

  onPickAnotherDate() {
    this.anotherDate = !this.anotherDate;
  }

  handleInputChange(fileInput) {

    // Init variables
    this._imageTooBig = false;
    this._errorLoadingImage = false;
    this.photos = [];

    if (fileInput.target.files && fileInput.target.files[0]) {
      this.article.photoName = fileInput.target.files[0].name;
      console.log(this.article);

      // Verify image size
      if (fileInput.target.files[0].size < 8000000) {
        let index = 0;

        // Save image on server side and get back its sanitize name
        this.photoService.savePhoto(fileInput.target.files[0])
          .then(name => {

          this.article.photoName = name.text();
          console.log('Sanitize name : ' + this.article.photoName);
            // Display image on miniature
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
          }).catch(err => {
          this._errorLoadingImage = true;
          console.log(err);
          console.log('ERROR');
        });
      }
      else {
        console.log('Image is over maximum size authorized');
        this._imageTooBig = true;
      }

    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private save() {
    console.log(this.article);
    if (!this.article.creationDate) {
      this.article.creationDate = (new Date()).toISOString();
    } else {
      this.article.creationDate = new Date(this.article.creationDate).toISOString();
    }
    this.article.latitude = this.latitude;
    this.article.longitude = this.longitude;
    this.articleService.save(this.article).then(art =>
      this.router.navigate(['/list'])
    );
  }
}
