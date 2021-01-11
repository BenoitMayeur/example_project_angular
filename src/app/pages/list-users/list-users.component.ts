import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-users-route',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit {

  public listUsers: User[]= [];

  constructor(
    private usersService: UsersService
  ) { 
    this.usersService.getAllUsers()
    .subscribe((data) => this.listUsers = data);

  }

  ngOnInit() {

  }

}
