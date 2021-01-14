import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UyelikService } from 'src/app/services/uyelik.service';

@Component({
  selector: 'app-postlar',
  templateUrl: './postlar.component.html',
  styleUrls: ['./postlar.component.scss'],
})
export class PostlarComponent implements OnInit {
  posts: Post[];
  secPost: Post;
  arama: string;
  constructor(
    private postServis: PostService,
    private uyelikServis: UyelikService
  ) {
    postServis
      .PostListele()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.key, ...c.payload.val() }))
        )
      )
      .subscribe((posts) => {
        let uye: string;
        this.posts = [];
        posts.forEach((p) => {
          // Get user name for post
          uyelikServis
            .UyeleriListele()
            .snapshotChanges()
            .pipe(
              map((changes) =>
                changes.map((c) => ({ key: c.key, ...c.payload.val() }))
              )
            )
            .subscribe((uyeler) => {
              // uyeleri user id göre filtrele
              uye = uyeler.filter((u) => u.uid === p.uid)[0].adsoyad;
              this.posts.push({ uye, ...p });
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

  Sil(key: string) {
    this.postServis.PostSil(key);
  }
}
