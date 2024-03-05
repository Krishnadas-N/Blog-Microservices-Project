import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginRegisterService } from './Services/User/login-register.service';
import { FeedLoadService } from './Services/feed/feed-load.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponentComponent } from './Components/add-post-component/add-post-component.component';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Client'
  loggedInUserName!:string
  isLoggedIn:boolean=false
  constructor(private authService:LoginRegisterService,private getUser:FeedLoadService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((data) =>{
      console.log("Is Authenticated : ", data);
      if (data != null){
        this.isLoggedIn = data || false;
      }
    })
    if(this.isLoggedIn){
      this.getUser.getloggedUser().subscribe(user=>{
        console.log("The user is",user)
        });
    }
  }
  addPost(): void {
    this.dialog.open(AddPostComponentComponent, {
      width: '300px',
      // Add any additional configuration options here
    });
  }
  logout(): void {
    this.authService.logout();
  }
 


}
