import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../../interfaces/user';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../../environments/environment';

const URL = 'http://' + environment.host + ':5000/user';

@Injectable()
export class UsersService {

  constructor(private http: Http) {
  }

  getUsers(username: string, password: string): Promise<User[]> {
    return this.http.get(`${URL}/${username}/${password}` ).toPromise().then(response => response.json());
  }

}
