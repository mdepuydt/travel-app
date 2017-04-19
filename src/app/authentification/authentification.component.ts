import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthentificationService} from '../authentification.service';
import {UsersService} from '../users.service';
import {User} from '../user';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  user: User;
  wrongLogin: boolean = false;

  constructor(private authService: AuthentificationService,
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
    this.usersService.getUsers().then(
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
