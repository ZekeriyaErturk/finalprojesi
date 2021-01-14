import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'angular-bootstrap-md/lib/free/utils';
import { Alert } from 'src/app/models/alert';
import { Uye } from 'src/app/models/uye';
import { UyelikService } from 'src/app/services/uyelik.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  uyeMail: string;
  uyeParola: string;
  secUye: Uye = new Uye();
  alert: Alert = new Alert();
  constructor(private router: Router, private uyelikServis: UyelikService) {}

  ngOnInit(): void {}

  KayitOl() {
    const tarih = new Date().getTime();
    // mail ve şifre ile uye ol
    this.uyelikServis
      .UyeOl(this.uyeMail, this.uyeParola)
      .then((d) => {
        // uye tablosuna kullanıcının eklenmesi
        d.user
          ?.updateProfile({ displayName: this.secUye.adsoyad })
          .then((res) => {
            localStorage.setItem('user', JSON.stringify(d.user));
          });
        this.secUye.uid = d.user.uid;
        this.secUye.mail = d.user.email;
        this.secUye.kayTarih = tarih.toString();
        this.UyeEkle();
      })
      .catch((err) => {
        this.alert.mesaj = 'Bir Hata Oluştu';
        this.alert.type = 'danger';
      });
  }

  UyeEkle() {
    this.uyelikServis.UyeEkle(this.secUye).then((d) => {
      this.router.navigate(['/']);
    });
  }
}
