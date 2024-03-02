import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from './Services/User/login-register.service';
import { FeedLoadService } from './Services/feed/feed-load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Client'
  loggedInUserName!:string
  isLoggedIn:boolean=false
  constructor(private authService:LoginRegisterService,private getUser:FeedLoadService){}

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
  logout(): void {
    this.authService.logout();
  }
 


}
