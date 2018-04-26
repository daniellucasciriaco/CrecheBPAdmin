import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* Services */
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  route = '';

  constructor(public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.authService.onAuthChangeSucess.subscribe(data => {
      if (data === null) {
        this.router.navigate(['/login']);
      }
    });
    this.authService.onAuthChangeError.subscribe(err => {
      this.router.navigate(['/login']);
    });
    this.activatedRoute.url.subscribe(data => {
      if (data.length === 0) {
        this.route = '';
      } else {
        this.route = data[0].path;
      }
    });
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

  getAtive(currentRoute: string) {
    if (this.route === currentRoute) {
      return 'nav-item active';
    }
    return 'nav-item';
  }
}
