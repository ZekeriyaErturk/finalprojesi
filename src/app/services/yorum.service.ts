import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Yorum } from '../models/yorum';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  // firebase database setup
  private dbComment = '/Yorumlar';
  yorumRef: AngularFireList<Yorum>;

  constructor(private db: AngularFireDatabase) {
    // yorum tablosu oluşturma
    this.yorumRef = db.list(this.dbComment);
  }

  // yorumların tamamını listele
  YorumListele() {
    return this.yorumRef;
  }

  // posta ait yorumları listele
  YorumListeleByPostID(postId: string) {
    return this.db.list('Yorumlar', (q) =>
      q.orderByChild('postid').equalTo(postId)
    );
  }

  // yorumları kullanıcıya göre listele
  YorumListeleByUID(uid: string) {
    return this.db.list('Yorumlar', (q) => q.orderByChild('uid').equalTo(uid));
  }

  // yorum ekle
  YorumEkle(yorum: Yorum) {
    return this.yorumRef.push(yorum);
  }

  // yorum düzenle
  YorumDüzenle(yorum: Yorum) {
    return this.yorumRef.update(yorum.key, yorum);
  }

  // yorum sil
  YorumSil(key: string) {
    return this.yorumRef.remove(key);
  }
}
