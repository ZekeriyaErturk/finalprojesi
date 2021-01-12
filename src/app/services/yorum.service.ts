import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Yorum } from '../models/yorum';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private dbComment = '/Yorumlar';
  yorumRef: AngularFireList<Yorum>;

  constructor(private db: AngularFireDatabase) {
    this.yorumRef = db.list(this.dbComment);
  }

  YorumListele() {
    return this.yorumRef;
  }

  YorumListeleByPostID(postId: string) {
    return this.db.list('Yorumlar', (q) =>
      q.orderByChild('postid').equalTo(postId)
    );
  }

  YorumListeleByUID(uid: string) {
    return this.db.list('Yorumlar', (q) => q.orderByChild('uid').equalTo(uid));
  }

  YorumEkle(yorum: Yorum) {
    return this.yorumRef.push(yorum);
  }

  YorumDüzenle(yorum: Yorum) {
    return this.yorumRef.update(yorum.key, yorum);
  }

  YorumSil(key: string) {
    return this.yorumRef.remove(key);
  }
}
