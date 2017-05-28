import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

const URL = 'http://' + environment.host + ':5000/photo';


@Injectable()
export class PhotosService {

  constructor(private http: Http) {
  }

  /*
   Save Photo on Python REST Services.
   The function return the whole response with the sanitize name of the image uploaded
   */
  savePhoto(photo: any): Promise<any> {
    let formData = new FormData();
    formData.append('file', photo);

    return this.http.post(`${URL}`, formData).toPromise().then(response => {
      return response;
    });
  }

  getPhoto(photoName: string): Promise<any> {
    console.log(photoName);
    return this.http.get(`${URL}/${photoName}`).toPromise().then(response => {
      return response.url
    });
  }

}
