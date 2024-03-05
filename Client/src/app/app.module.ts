import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginCOmponentComponent } from './Components/login-component/login-component.component';
import { RegisterComponentComponent } from './Components/register-component/register-component.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularMaterialModule } from './angular-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FeedComponentComponent } from './Components/feed-component/feed-component.component';
import { HttpClientModule } from '@angular/common/http';
import { AddPostComponentComponent } from './Components/add-post-component/add-post-component.component';
import { AddPostCompoentntComponent } from './Components/add-post-compoentnt/add-post-compoentnt.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedDetailComponent } from './Components/feed-detail/feed-detail.component';
 

@NgModule({
  declarations: [
    AppComponent,
    LoginCOmponentComponent,
    RegisterComponentComponent,
    FeedComponentComponent,
    AddPostComponentComponent,
    AddPostCompoentntComponent,
    FeedDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
     ReactiveFormsModule,
     FlexLayoutModule, 
     HttpClientModule,
     MatDialogModule,
     MatButtonModule,
     
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
