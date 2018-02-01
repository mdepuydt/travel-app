import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';

import {User} from './user';

@Injectable()
export class AuthentificationService {

  private currentUser: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor() {
  }

  setUser(user: User) {
    this.currentUser.next(user);
  }

  updates(): Observable<User> {
    return this.currentUser.asObservable();
  }

  reset() {
    const user: User = {
      'username': '',
      'password': ''
    };
    this.currentUser.next(user);
  }

}
