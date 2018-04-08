import {Component, OnInit} from '@angular/core';

import {User} from '../interfaces/user';

import {AuthenticationService} from '../services/authentication/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  currentUser: User;

  constructor(private authService: AuthenticationService) {
    this.clear();
  }

  ngOnInit() {
    this.authService.updates().subscribe(
      (user) => this.currentUser = user);
  }

  clear() {
    this.currentUser = {
      'username': '',
      'password': ''
    }
  }

  logOut() {
    this.authService.reset();
    this.clear();
  }

}
