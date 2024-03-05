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

  uploadFile(name: string, description: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('post', file);
    formData.append('title', name);
    formData.append('description', description);

    const headers = this.getHeaders();

    return this.http.post(`${this.Url}/posts/`, formData, { headers });
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
  getUser(userId:string):Observable<any>{
    return this.http.get<Comment[]>(`${this.Url}/users/get-user/${userId}`, {
      headers: this.getHeaders()
    });
  }

  getPost(postId:string):Observable<any>{
    return this.http.get<Comment[]>(`${this.Url}/posts/${postId}`, {
      headers: this.getHeaders()
    });
   
  }
  
  getComment(postId:string):Observable<any>{
    return this.http.get<Comment[]>(`${this.Url}/comments/${postId}`, {
      headers: this.getHeaders()
    });
  }

  addComment(content:string,postId:string):Observable<any>{
    const body = {
      content: content,
      postId: postId
    };
    
    return this.http.post<Comment[]>(`${this.Url}/comments`,body, {
      headers: this.getHeaders()
    });
  }
  
}
