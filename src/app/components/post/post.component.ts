import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/models/post';
import { Uye } from 'src/app/models/uye';
import { PostService } from 'src/app/services/post.service';
import { UyelikService } from 'src/app/services/uyelik.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  key: string;
  post: Post;
  user: Uye;
  loggedUser: Uye;
  constructor(
    private uyeServis: UyelikService,
    private route: ActivatedRoute,
    private router: Router,
    private postServis: PostService
  ) {
    route.params.subscribe((d) => {
      this.key = d.key;
    });

    postServis
      .PostbyKey(this.key)
      .snapshotChanges()
      .subscribe((d) => {
        this.post = d.payload.val() as Post;
        this.post.key = d.key;
        // post gönderen üye bilgileri
        uyeServis
          .UyeleriListele()
          .snapshotChanges()
          .pipe(
            map((changes) =>
              changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
            )
          )
          .subscribe((d) => {
            this.user = d.filter((u) => u.uid === this.post.uid)[0];
          });
      });

    uyeServis.user.subscribe((p) => (this.loggedUser = p));
  }

  ngOnInit(): void {}

  Like(post: Post) {
    if (!this.loggedUser) {
      this.router.navigate(['/login']);
    } else {
      post.likes += 1;
      this.postServis.PostDüzenle(post);
    }
  }
}
