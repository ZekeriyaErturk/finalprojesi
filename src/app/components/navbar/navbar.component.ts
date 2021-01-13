import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UyelikService } from 'src/app/services/uyelik.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  uid: string;
  user: any;
  constructor(public uyelikServis: UyelikService, private router: Router) {
    this.uyelikServis.user.subscribe((u) => {
      this.uid = u?.uid;
      uyelikServis
        .UyeleriListele()
        .snapshotChanges()
        .pipe(
          map((changes) =>
            changes.map((c) => ({ key: c.key, ...c.payload.val() }))
          )
        )
        .subscribe((uyeler) => {
          this.user = uyeler.filter((u) => u.uid === this.uid)[0];
        });
    });
  }

  ngOnInit(): void {}

  OturumKapat() {
    this.uyelikServis.OturumKapat().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}
