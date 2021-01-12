import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Uye } from '../models/uye';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UyelikService {
  // kullanıcı kontrol için observer
  user: Observable<any>;
  // database setup
  private dbUye = '/Uyeler';
  uyeRef: AngularFireList<Uye>;

  constructor(
    // firebase dependency injections
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    // firebase login durum
    this.user = this.afAuth.authState;
    // firebase kullanıcı tablosu
    this.uyeRef = db.list(this.dbUye);
  }

  // mail ve şifre ile kullanıcı girişi
  OturumAc(mail: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, password);
  }

  // mail ve şifre ile kullanıcı kayıt
  UyeOl(mail: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(mail, password);
  }

  // uyenin db kaydının yapılması
  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }

  // logout
  OturumKapat() {
    return this.afAuth.signOut();
  }
}
