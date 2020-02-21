import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AuthenticationServiceService } from 'src/authentication-service.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private apiService:ApiService,private confirmationService: ConfirmationService) { 
    this.apiService.updateHeader();
  }

  UsersList:Array<Employee>;
  isAdminUser:any;
  ngOnInit() {
    this.isAdminUser = sessionStorage["IsAdminUser"];
    this.fillUsersGrid();
  }

  fillUsersGrid(){
    this.apiService.getUserList().subscribe((data)=>{
      this.UsersList=data;
      console.log( this.UsersList)
    })
  }
  delete(PUID){
    this.apiService.deleteUserByPUID(PUID).subscribe(()=>this.fillUsersGrid());    
  }


  confirm(PUID) {

    this.confirmationService.confirm({
      //message: 'Are you sure that you want to perform this action?',
      message: 'Would you like to delete the User? If yes, please click on “Confirm” and your request will be automatically saved. If no, please click on “Cancel”',
      accept: () => {
        this.delete(PUID)
      }
    });
  }
}
export class Employee {
  PUID: string;
  DisplayName: string;
  Country: string;
  Email: string;
  Title: string;
}