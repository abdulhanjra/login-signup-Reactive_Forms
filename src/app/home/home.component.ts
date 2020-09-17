import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DataService } from '../data/data.service';
import { User } from '../data/register.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  errorMessage: '';
  users: any;
  

  constructor(private dataService: DataService, private router: Router) {
      this.user = this.dataService.userValue;
  }

  ngOnInit(){
    this.dataService.getAll()
    .pipe(first())
    .subscribe(users => this.users = users);  
    console.log(this.users)
  }
  onHttpError(error: any): void {
    throw new Error('Method not implemented.');
  }

  logout() {  
    console.log('logout');  
    this.dataService.logout();  
    this.router.navigate(['/signin']);  
  }  


}
