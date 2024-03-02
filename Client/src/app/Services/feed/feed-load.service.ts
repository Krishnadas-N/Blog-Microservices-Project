import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedLoadService {
  private Url ='http://localhost:3000';
  private token!: string | null;

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.Url}/posts`, {
      headers: this.getHeaders()
    });
  }

  getAllCommentsByPostId(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.Url}/comments/${postId}`, {
      headers: this.getHeaders()
    });
  }
  private getHeaders(): HttpHeaders {
    this.token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }

  getloggedUser():Observable<any>{
    return this.http.get<Comment[]>(`${this.Url}/users`, {
      headers: this.getHeaders()
    });
  }
}
