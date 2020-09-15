import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { User } from '../data/register.interface'
import { DataService } from '../data/data.service'
import { ActivatedRoute, Router } from '@angular/router';

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
  
  private route: ActivatedRoute;

  postError: boolean;
  postErrorMessage: string;
  errorMessage: String; 
  successMessage: string;

  constructor(private dataService: DataService,
              private router: Router) { }
  

  onSubmit(form: NgForm){
    
    console.log("In onSubmit()", form.valid);
    console.log(this.users);
    if(form.valid){
      this.dataService.signUp(this.users).subscribe(
        (result:any) => {
          if(result.status==200){
            this.successMessage="Signup Successful";
            this.router.navigate(['/signin']);
            //this.router.navigateByUrl('/signin');
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
  onHttpError(error: any): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // this.dataService.getUser().subscribe({
    //   next: users => {
    //     this.users = this.users;
    //   },
    //   error: err => this.errorMessage = err 
    // });     
  }

}
