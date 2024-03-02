import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCOmponentComponent } from './Components/login-component/login-component.component';
import { RegisterComponentComponent } from './Components/register-component/register-component.component';
import { FeedComponentComponent } from './Components/feed-component/feed-component.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path:'feed',component:FeedComponentComponent},
  { path: 'login', component: LoginCOmponentComponent },
  { path: 'register', component: RegisterComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
