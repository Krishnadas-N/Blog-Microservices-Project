import { Component, OnInit } from '@angular/core';
import { FeedLoadService } from '../../Services/feed/feed-load.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-component',
  templateUrl: './feed-component.component.html',
  styleUrl: './feed-component.component.css'
})
export class FeedComponentComponent implements OnInit{
  posts!: any[];
  loadingPosts: boolean = true;
  constructor(private postService: FeedLoadService,private userService :FeedLoadService,private router:Router) {}

  ngOnInit(): void {
    console.log("ngonoit");
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe((posts: any) => {
      console.log(posts);
      this.posts = posts?.data;
      const userObservables = this.posts.map(post => this.userService.getUser(post.author));
      forkJoin(userObservables).subscribe(users => {
        console.log(users);
        this.posts.forEach((post, index) => {
          console.log(users[index].user.username);
          post.author = users[index].user.username;
        });
        setTimeout(()=>{
          this.loadingPosts = false;
        },1000)
      });
    });
  }

  loadCommentsForPost(postId: string): void {
    console.log(postId);
    this.router.navigate(['feed', postId]); // Navigating to 'feed/:postId' route with postId parameter
  }
  
}
