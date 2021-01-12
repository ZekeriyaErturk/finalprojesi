import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  posts: Post[];
  constructor(private postServis: PostService) {
    postServis
      .PostListele()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.posts = [];
        data.forEach((p) => this.posts.push(p as Post));
        this.posts = this.posts.sort((a, b) => b.likes - a.likes).slice(0, 3);
        console.log(this.posts);
      });
  }

  ngOnInit(): void {}
}
