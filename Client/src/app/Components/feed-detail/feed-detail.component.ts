import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedLoadService } from '../../Services/feed/feed-load.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-feed-detail',
  templateUrl: './feed-detail.component.html',
  styleUrl: './feed-detail.component.css'
})
export class FeedDetailComponent implements OnInit {
  postId!: string;
  post!: any;
  newCommentText: string = '';
  constructor(private route: ActivatedRoute,private postService :FeedLoadService) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.postId = params['postId'];
        return this.postService.getPost(this.postId);
      }),
      switchMap(post => {
        console.log(post);
        this.post = post.data;
        console.log(post.data._id);
        return this.postService.getComment(post.data._id);
      }),
      switchMap(commentsData => {
        console.log(commentsData);
        const comments = commentsData.data.map((comment: any) => ({
          content: comment.comment,
          author: comment.author
        }));
        this.post.comments = comments;
        return this.postService.getUser(this.post.author);
      })
    ).subscribe(
      userData => {
        console.log("User Data", userData);
        this.post.author =  userData.user.username;
        console.log(this.post);
        // Handle user data if needed
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  addComment(): void {
    if (this.newCommentText.trim() !== '') {
      const newComment = {
        author: 'Current User', // Replace with actual user's name or ID
        text: this.newCommentText
      };
      this.postService.addComment(this.newCommentText,this.post._id).subscribe(res=>{
        this.post.comments.push(newComment);
      })
      

      this.newCommentText = '';

    }
  }
}
