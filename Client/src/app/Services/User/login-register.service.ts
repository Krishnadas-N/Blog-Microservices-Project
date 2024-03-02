import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private registerUrl = ' http://localhost:3000/users';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticatedSubject.next(true); // Set authentication status to true
    }
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.registerUrl}/register`, { username, email, password });
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.registerUrl}/login`, { username, password });
  }
  SetLoggedIn(){
    this.isAuthenticatedSubject.next(true)
  }
  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);

  }

  

}
