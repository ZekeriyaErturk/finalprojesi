import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UyelikService } from 'src/app/services/uyelik.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any;
  constructor(public uyelikServis: UyelikService, private router: Router) {
    uyelikServis.user.subscribe((d) => (this.user = d));
  }

  ngOnInit(): void {}

  OturumKapat() {
    this.uyelikServis.OturumKapat().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}
