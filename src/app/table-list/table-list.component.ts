import { Component,Output, OnInit } from '@angular/core';
import { FormGroup,ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
 import { DataService } from './../data.service';
 import { DialogConfirmationComponent } from './../common/dialog-confirmation/dialog-confirmation.component';
 import { Observable } from 'rxjs';
 import 'rxjs/add/operator/map';
 import { Router } from '@angular/router';
 import { HttpClient } from '@angular/common/http';
import { UserList } from './../models/detail'
import {ActivatedRoute} from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {ApiResponse} from './../dto/api-response';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  list_Obj: UserList;
  public list: any = [];
  public array:any = [];
  hello = 'pkp';
  _id:any;
  dataSource: MatTableDataSource<UserList>;
  userToEdit: UserList;
  isEditCall = false;
  display2='none'
  constructor(private http: HttpClient,private router:Router,private newservice:DataService,
    private route: ActivatedRoute,public dialog: MatDialog) {
    }
    ngOnInit() {
      this.userToEdit = <UserList>{};
      this._init();
      const name=localStorage.getItem('list');
      this.list=JSON.parse(name);
      console.log(this.list);
    }
    private _init() {
      if (null != this._setAccess()) {
        this.userToEdit = this._setAccess();
      }
      this.newservice.listUser().subscribe((resultArray: any) => {
        console.log('xxxxxxxx xxxxxxxx xxxxxxxx response is ', resultArray.body);
        this.array =  resultArray.body
        console.log(this.array)
        const body = localStorage.setItem('body',JSON.stringify(resultArray.body));
        if (this.list) {
          this.dataSource = new MatTableDataSource(this.list);
        }
      });
    }


  
   
    public edit(list) {
       this.isEditCall = true;
       this.newservice.changeMessage(list);
      console.log("edittttttttttt",list);
      this.router.navigate(['/add-user'])
      
    }

    public deleteUser(_id: string) {
      let dialogRef = this.dialog.open(DialogConfirmationComponent, {
        width: '500px',
        data: { key: _id }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._deleteUser(result.key);
        }
      });
    }

    private deleteRow(_id: string) {
      this.list.forEach((value, index) => {
        if (value._id == _id) {
          this.list.splice(index, 1);
          return;
        }
      });
    }
    
    private _setAccess(): UserList {
      let user = JSON.parse(localStorage.getItem('current-user'));
      console.log('xxxxxxx xxxxxxxxxxxxx xxxxxxxxx logged user is ', user);
      return user;
    }
    private _deleteUser(_id: string) {
      // this.display2 = "block";
      console.log('xxxx xxxx xxxxx xxx id is ', _id);
      this.newservice.deleteUser(_id).subscribe(() => {
        this.deleteRow(_id);
        this.dataSource = new MatTableDataSource(this.list);


        
        localStorage.clear();
      });
    }
    hidePopup1(){
      this.display2="none";
    }
    
}
