import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalpopupComponent } from './modalpopup/modalpopup.component';
import * as alertify from 'alertifyjs'
import { AppSettings } from './Service/master.service';
import { ApiAction } from './shared/Enums/api-action.enum';
import { StatusEnum } from './shared/Enums/status.enum';
import { ApiUrl } from './shared/Enums/api-url.enum';
import { User } from './Model/User';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  statusEnum: typeof StatusEnum = StatusEnum;
  displayedColumns: string[] = ['name', 'email', 'birthday', 'status', 'action'];
  dataSource: any;
  users: User[] = [];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: AppSettings, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.setData();
  }



  async setData() {
    this.users = await this.getUsers() as User[];
    this.dataSource = new MatTableDataSource<User>(this.users)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getUsers() {
    return new Promise((resolve, reject) => {
      this.service.getAll(`${ApiUrl.User}/${ApiAction.GetAll}`).subscribe(res => {
        resolve(res);
      }, (err: any) => {
        reject(err)
      });
    });
  }

  deleteUser(id: number) {
    return new Promise((resolve, reject) => {
      this.service.delete(ApiUrl.User, id).subscribe(res => {
        resolve(true);
      }, (err: any) => {
        reject(err)
      });
    });
  }

  // GetAll() {
  //   this.service.getAll(ApiAction.GetAll).subscribe((result as any) => {
  //     this.empdata = result;


  //   });
  // }
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  edit(id: any) {
    this.OpenDialog('1000ms', '600ms', id)
  }


  delete(id: number) {
    alertify.confirm("Remove Employee", "Do you want to remove?", async () => {
      const result = await this.deleteUser(id);
      if (result) {
        this.users = await this.getUsers() as User[];
        this.dataSource = new MatTableDataSource<User>(this.users)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        alertify.success("Removed successfully.")
      } else {
        alertify.warn("Erreur server.")
      }
    })
  }

  OpenDialog(enteranimation: any, exitanimation: any, id: any) {

    const dialogModal = this.dialog.open(ModalpopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data: {
        id: id
      }
    })
    dialogModal.afterClosed().subscribe((res: any) => {
      this.setData();
    });
  }

}
