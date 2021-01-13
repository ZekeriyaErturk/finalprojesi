import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Yorum } from 'src/app/models/yorum';
import { UyelikService } from 'src/app/services/uyelik.service';
import { YorumService } from 'src/app/services/yorum.service';
import { map } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-yorumekle',
  templateUrl: './yorumekle.component.html',
  styleUrls: ['./yorumekle.component.scss'],
})
export class YorumekleComponent implements OnInit {
  postId: string;
  user: string;
  post: Post;
  comments: Yorum[];
  secYorum: Yorum = new Yorum();

  constructor(
    private uyelikServis: UyelikService,
    private yorumServis: YorumService,
    private postServis: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    uyelikServis.user.subscribe((u) => {
      this.user = u?.uid;
    });
    route.params.subscribe((r) => (this.postId = r.key));
    this.postServis
      .PostbyKey(this.postId)
      .snapshotChanges()
      .subscribe((data) => {
        // update likes of post
        this.post = data.payload.val() as Post;
        this.post.key = data.key;
      });
  }

  ngOnInit(): void {
    this.YorumlarıGetir();
  }

  YorumlarıGetir() {
    this.yorumServis
      .YorumListeleByPostID(this.postId)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.toJSON() }))
        )
      )
      .subscribe((data) => {
        this.comments = [...(data as Yorum[])];
      });
  }

  YorumEkle() {
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      const tarih = new Date().getTime();
      this.secYorum.duzTarih = tarih.toString();
      this.secYorum.kayTarih = tarih.toString();
      this.secYorum.postid = this.postId;
      this.secYorum.uid = this.user;
      this.yorumServis.YorumEkle(this.secYorum);
      this.YorumArttır();
      this.secYorum.yorum = '';
    }
  }

  YorumArttır() {
    // Get the post by ıd
    this.post.yorum += 1;
    this.postServis.PostDüzenle(this.post);
  }
}
