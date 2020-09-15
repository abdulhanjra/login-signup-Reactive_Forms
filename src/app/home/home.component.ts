import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { User } from '../data/register.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;

  // constructor(private dataService: DataService) {
  //     this.user = this.dataService.getById();
  // }

  ngOnInit(): void {
  }

}
