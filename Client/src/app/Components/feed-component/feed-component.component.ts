import { Component } from '@angular/core';
import { FeedLoadService } from '../../Services/feed/feed-load.service';

@Component({
  selector: 'app-feed-component',
  templateUrl: './feed-component.component.html',
  styleUrl: './feed-component.component.css'
})
export class FeedComponentComponent {
  posts!: any[];
  loadingPosts: boolean = true;

  constructor(private postService: FeedLoadService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
      this.loadingPosts = false; // Set loading state to false once posts are loaded
    });
  }

  loadCommentsForPost(post: any): void {
    if (!post.commentsLoaded) {
      this.postService.getAllCommentsByPostId(post.id).subscribe(comments => {
        post.comments = comments;
        post.commentsLoaded = true; // Flag to indicate comments have been loaded
        post.showComments = true; // Show comments when loaded
      });
    } else {
      post.showComments = !post.showComments; // Toggle comments visibility if already loaded
    }
  }
}
