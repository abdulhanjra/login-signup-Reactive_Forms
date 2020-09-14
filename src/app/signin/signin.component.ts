import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { DataService } from '../data/data.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  model = {
    username: '',
    password: ''
}
  postError: boolean;
  postErrorMessage: string;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }
  
  onSubmit(form: NgForm){
    console.log("In onSubmit()", form.valid);
    console.log(this.model);
    if(form.valid){
      this.dataService.signIn(this.model).subscribe(
        
      result => console.log("success", result),
      error => this.onHttpError(error)
    );
    }
    else{
      console.log('Invalid username or password');
      this.postError = true;
      this.postErrorMessage = "Please fix above errors";
    }
 }

 onHttpError(err: any): Observable<never>{
   let errorMessage = '';
   if(err.status == 400){
     console.log("Error is: ", err);
     this.postErrorMessage = err.error.message;
   }

   return throwError(errorMessage);
  // throw new Error('Method not implemented.');
  }

}
