import { Component, OnInit } from '@angular/core';
import { UyelikService } from 'src/app/services/uyelik.service';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  alert: Alert = new Alert();
  constructor(private uyelikServis: UyelikService, private router: Router) {}

  ngOnInit(): void {}

  GirisYap(mail: string, parola: string) {
    // Giriş yap ve anasayfaya yönlendir.
    this.uyelikServis
      .OturumAc(mail, parola)
      .then((d: any) => {
        localStorage.setItem('user', JSON.stringify(d.user));
        this.router.navigate(['/']);
      })
      .catch((err: any) => {
        this.alert.mesaj = 'Bir Hata Oluştu';
        this.alert.type = 'danger';
      });
  }
}
