import { Injectable } from '@angular/core';
import { User } from './register.interface';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userUrl = 'http://127.0.0.1:3000/';

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient){
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  saveUser(user){
    this.currentUserSubject.next(user);
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  signUp(user: User) {
    return this.http.post(`http://127.0.0.1:3000/api/users/register`, user, { observe: 'response' });
  }

  signIn(username, password) {
    return this.http.post(`http://127.0.0.1:3000/api/users/authenticate`,  {username, password} , { observe: 'response' });
  }

  getAll() {
    return this.http.get(`http://127.0.0.1:3000/api/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`http://127.0.0.1:3000/api/users/${id}`);
  }

  public get userValue(): User {
    return this.currentUserSubject.value;
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = " ";
    if(err.error instanceof ErrorEvent){
        errorMessage = `An error occured: ${err.error.message}`;
    }
    else{
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token');    
    localStorage.removeItem('currentUser');
  } 

  
}
