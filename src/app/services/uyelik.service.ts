import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Uye } from '../models/uye';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UyelikService {
  user: Observable<any>;
  private dbUye = '/Uyeler';
  uyeRef: AngularFireList<Uye>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.user = this.afAuth.authState;
    this.uyeRef = db.list(this.dbUye);
  }

  OturumAc(mail: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, password);
  }

  UyeOl(mail: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(mail, password);
  }

  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }

  OturumKapat() {
    return this.afAuth.signOut();
  }
}
