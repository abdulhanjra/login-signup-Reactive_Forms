import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { User } from '../data/register.interface'
import { DataService } from '../data/data.service'
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  users: User = {
    username: null,
    firstName: null,
    lastName: null,
    password: null 
  };

  form: FormGroup;
  submitted = false; 
  loading = false;

  postError: boolean;
  postErrorMessage: string;
  errorMessage: String; 
  successMessage: string;
  isAlredayExists: string;


  constructor(private dataService: DataService,
              private router: Router,
              private formBuilder: FormBuilder) { 

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("^[A-Za-z_-][A-Za-z_-]*$")]],
      firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
      password: ['', [Validators.required, Validators.minLength(8), 
                Validators.pattern("^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$")]]
    });  
  }

  get f() { return this.form.controls; }

  // onSubmit(form: NgForm){
    
  //   console.log("In onSubmit()", form.valid);
  //   console.log(this.users);
  //   if(form.valid){
  //     this.dataService.signUp(this.users).subscribe(
  //       (result:any) => {
  //         if(result.status==200){
  //           this.successMessage="Signup Successful";         onSubmit() template drive form
  //           this.router.navigate(['/signin']);
  //         }
  //       },
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
    this.dataService.signUp(this.form.value)
        .pipe(first())
        .subscribe(
          (result:any) => {
            if(result.status==200){
              this.successMessage="Signup Successful"           
              this.router.navigate(['/signin']);
              localStorage.setItem('isLoggedIn', "true"); 
            }
          },
          error => this.onHttpError(error)
        );
  }



  onHttpError(error: any): void {
    if(error.status==400){              
              this.isAlredayExists = "Username already exist";
              localStorage.setItem('isLoggedIn', "false");
            }
    throw new Error('Method not implemented.');
  }

  

}
