import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../services/authentication/authentication.service';
import {UsersService} from '../services/followers/users.service';
import {User} from '../interfaces/user';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['authentification.component.scss']
})
export class AuthenticationComponent implements OnInit {

  user: User;
  wrongLogin: boolean = false;

  constructor(private authService: AuthenticationService,
              private usersService: UsersService,
              private router: Router) {
    this.clear();
  }

  ngOnInit() {
  }

  clear() {
    this.user = {
      'username': '',
      'password': ''
    }
  }

  logIn(user: User) {
    this.usersService.getUsers(user.username, user.password).then(
      response => {
        let result: User = response.find(u => u.username == user.username && u.password == user.password);
        if (result != undefined) {
          this.wrongLogin = false;
          this.user = result;
          console.log("Success");
          this.authService.setUser(this.user);
          this.router.navigate(['/edit']);
        } else {
          this.wrongLogin = true;
          console.log("Try again");
        }
      }
    );
  }

}
