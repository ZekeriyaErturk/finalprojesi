import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Uye } from 'src/app/models/uye';
import { UyelikService } from 'src/app/services/uyelik.service';

@Component({
  selector: 'app-uyeler',
  templateUrl: './uyeler.component.html',
  styleUrls: ['./uyeler.component.scss'],
})
export class UyelerComponent implements OnInit {
  uyeler: Uye[];
  secUye: Uye;
  arama: string;
  constructor(private uyelikServis: UyelikService) {
    uyelikServis
      .UyeleriListele()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.key, ...c.payload.val() }))
        )
      )
      .subscribe((users) => {
        this.uyeler = [];
        users = users.filter((u) => u.rol !== 'admin');
        users.forEach((u) => this.uyeler.push(u));
      });
  }

  ngOnInit(): void {}

  Duzenle() {
    this.uyelikServis.UyeDuzenle(this.secUye);
  }

  Sil(uye: Uye) {
    this.uyelikServis.UyeSil(uye);
  }
}
