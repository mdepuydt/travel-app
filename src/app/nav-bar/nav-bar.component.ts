import {Component, OnInit} from '@angular/core';

import {User} from '../user';

import {AuthentificationService} from '../authentification.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private currentUser: User;

  constructor(private authService: AuthentificationService) {
    this.clear();
  }

  ngOnInit() {
    this.authService.updates().subscribe((user) => this.currentUser = user);
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
