import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // firebase post setup
  private dbPost = '/Postlar';
  postRef: AngularFireList<Post>;

  constructor(private db: AngularFireDatabase) {
    // postlar tablosu oluştur
    this.postRef = db.list(this.dbPost);
  }

  // postları databaseden iste
  PostListele() {
    return this.postRef;
  }

  // postları kullanıcılara göre listele
  PostListeleByUID(uid: string) {
    return this.db.list('Postlar', (q) => q.orderByChild('uid').equalTo(uid));
  }

  // belirli bir postu listele
  PostbyKey(key: string) {
    return this.db.object(`Postlar/${key}`);
  }

  // post ekle
  PostEkle(post: Post) {
    return this.postRef.push(post);
  }

  // post düzenle
  PostDüzenle(post: Post) {
    return this.postRef.update(post.key, post);
  }

  // post sil
  PostSil(key: string) {
    return this.postRef.remove(key);
  }
}
