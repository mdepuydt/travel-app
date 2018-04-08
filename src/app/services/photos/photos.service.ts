import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

const URL = 'http://' + environment.host + ':' + environment.port + '/api';


@Injectable()
export class PhotosService {

  constructor(private http: Http) {
  }

  /*
   Save Photo on Python REST Services.
   The function return the whole response with the sanitize name of the image uploaded
   */
  savePhoto(photo: any): Promise<any> {
    console.log('save photo');
    let formData = new FormData();
    formData.append('file', photo);
    console.log('save photo');
    return this.http.post(`${URL}/photos`, formData).toPromise().then(response => {
      return response;
    });
  }

  getPhoto(photoName: string): Promise<any> {
    console.log(photoName);
    return this.http.get(`${URL}/photo/${photoName}`).toPromise().then(response => {
      return response.url
    });
  }

}
