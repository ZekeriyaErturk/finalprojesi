import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Uye } from 'src/app/models/uye';
import { PostService } from 'src/app/services/post.service';
import { UyelikService } from 'src/app/services/uyelik.service';

@Component({
  selector: 'app-postlarim',
  templateUrl: './postlarim.component.html',
  styleUrls: ['./postlarim.component.scss'],
})
export class PostlarimComponent implements OnInit {
  user: Uye;
  postlar: Post[];
  secPost: Post;
  constructor(
    private postServis: PostService,
    private uyeServis: UyelikService
  ) {
    this.uyeServis.user.subscribe((d) => {
      this.user = d;
      this.postServis
        .PostListeleByUID(this.user.uid)
        .snapshotChanges()
        .subscribe((d) => {
          this.postlar = [];
          d.forEach((post) => {
            const p = { ...post.payload.toJSON(), key: post.key };
            this.postlar.push(p as Post);
          });
        });
    });
  }

  ngOnInit(): void {}

  Duzenle() {
    const tarih = new Date().getTime();
    this.secPost.duzTarih = tarih.toString();
    this.postServis.PostDüzenle(this.secPost);
  }

  Secpost(key: string) {
    this.postServis
      .PostbyKey(key)
      .snapshotChanges()
      .subscribe((d) => {
        this.secPost = { key: d.key, ...(d.payload.toJSON() as Post) };
      });
  }

  Sil(key: string) {
    this.postServis.PostSil(key);
  }
}
