import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  successMessage: String;
  
  
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(form: NgForm){
    console.log("In onSubmit()", form.valid);
    if(form.valid){
      this.dataService.signIn(this.model).subscribe(
      (result:any) => {
        if(result.status==200){
          this.successMessage="Login Successful"
          this.router.navigate(['/home/:id']);
        }
      },
      error => this.onHttpError(error)
    );
    }
    else{
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
