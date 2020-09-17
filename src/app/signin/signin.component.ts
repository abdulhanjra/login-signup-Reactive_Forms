import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../data/data.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 
  form: FormGroup;
  submitted = false;
  loading = false;
  
  model = {
    username: '',
    password: ''
}
  postError: boolean;
  postErrorMessage: string;
  successMessage: String;
  returnUrl: string;
  
  
  constructor(private dataService: DataService, 
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  // get return url from route parameters or default to '/'
  // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  
  // onSubmit(form: NgForm){
  //   console.log("In onSubmit()", form.valid);
  //   if(form.valid){
  //     this.dataService.signIn(this.model).subscribe(
      // (result:any) => {
      //   if(result.status==200){
      //     this.successMessage="Login Successful"           onSubmit() for template driven
      //     this.router.navigate(['/home']);
      //   }
      // },
  //     error => this.onHttpError(error)
  //   );
  //   }
  //   else{
  //     this.postError = true;
  //     this.postErrorMessage = "Please fix above errors";
  //   }
  // }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.dataService.signIn(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          (result:any) => {
            if(result.status==200){
              this.successMessage="Login Successful";
              this.router.navigate(['/home']);  
              this.dataService.saveUser(result.body);              
              localStorage.setItem('isLoggedIn', "true");  
              localStorage.setItem('token', this.f.username.value); 
             }
          },
            error => this.onHttpError(error)
        );
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