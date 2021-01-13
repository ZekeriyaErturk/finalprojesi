import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[];
  carouselPosts: Post[];

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
        this.carouselPosts = [];
        data.forEach((p) => {
          this.posts.push(p as Post);
          this.carouselPosts.push(p as Post);
        });

        this.carouselPosts = this.carouselPosts
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 3);
      });
  }

  ngOnInit(): void {}
}
