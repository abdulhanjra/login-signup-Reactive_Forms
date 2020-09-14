import { Injectable } from '@angular/core';
import { User } from './register.interface';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userUrl = 'http://127.0.0.1:3000/';
  


  constructor(private http: HttpClient){}
  
  signUp(user) {
    return this.http.post(`http://127.0.0.1:3000/api/users/register`, user, { observe: 'response' });
  }

  signIn(user) {
    return this.http.post(`http://127.0.0.1:3000/api/users/authenticate`,  user , { observe: 'response' });
  }

  getAll() {
    return this.http.get<User[]>(`http://127.0.0.1:3000/api/users`);
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

  
}
