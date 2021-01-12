import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UyelikService } from 'src/app/services/uyelik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postekle',
  templateUrl: './postekle.component.html',
  styleUrls: ['./postekle.component.scss'],
})
export class PostekleComponent implements OnInit {
  user: string;
  secPost: Post = new Post();
  constructor(
    private postServis: PostService,
    private uyelikServis: UyelikService,
    private router: Router
  ) {
    uyelikServis.user.subscribe((u) => {
      this.user = u?.uid;
    });
  }

  ngOnInit(): void {}

  PostEkle() {
    if (!this.secPost.imgUrl) {
      this.secPost.imgUrl = 'https://via.placeholder.com/1920x1080.png';
    }
    const tarih = new Date().getTime();
    this.secPost.kayTarih = tarih.toString();
    this.secPost.duzTarih = tarih.toString();
    this.secPost.uid = this.user;
    this.postServis.PostEkle(this.secPost);
    this.router.navigate(['/']);
  }
}
