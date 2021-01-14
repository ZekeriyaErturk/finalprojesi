import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { YorumService } from '../../services/yorum.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input() posts: Post[];
  constructor() {}

  ngOnInit(): void {}
}
