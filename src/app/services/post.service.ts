import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private dbPost = '/Postlar';
  postRef: AngularFireList<Post>;

  constructor(private db: AngularFireDatabase) {
    this.postRef = db.list(this.dbPost);
  }

  PostListele() {
    return this.postRef;
  }

  PostListeleByUID(uid: string) {
    return this.db.list('Postlar', (q) => q.orderByChild('uid').equalTo(uid));
  }

  PostbyKey(key: string) {
    return this.db.object(`Postlar/${key}`);
  }

  PostEkle(post: Post) {
    return this.postRef.push(post);
  }

  PostDüzenle(post: Post) {
    return this.postRef.update(post.key, post);
  }

  PostSil(key: string) {
    return this.postRef.remove(key);
  }
}
