import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {User} from './user';
import 'rxjs/add/operator/toPromise';
import {environment} from '../environments/environment';

const URL = 'http://' + environment.host + ':3000/users';

@Injectable()
export class UsersService {

  constructor(private http: Http) {
  }

  getUsers(): Promise<User[]> {
    return this.http.get(`${URL}`).toPromise().then(response => response.json());
  }

}
