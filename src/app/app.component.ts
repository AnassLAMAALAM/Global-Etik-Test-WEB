import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalpopupComponent } from './modalpopup/modalpopup.component';
import { AppSettings } from './Service/master.service';
import { ApiAction } from './shared/Enums/api-action.enum';
import { StatusEnum } from './shared/Enums/status.enum';
import { ApiUrl } from './shared/Enums/api-url.enum';
import { User } from './Model/User';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2'
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  //#region 
  statusEnum: typeof StatusEnum = StatusEnum;
  displayedColumns: string[] = ['name', 'email', 'birthday', 'status', 'action'];
  dataSource: any;
  users: User[] = [];
  //#endregion

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: AppSettings, private dialog: MatDialog, private titleService: Title) {
    this.titleService.setTitle("Global Itik Test");
  }

  ngOnInit(): void {
    this.setData();
  }

  /**
   * set data in datatable
   */
  async setData() {
    this.users = await this.getUsers() as User[];
    this.dataSource = new MatTableDataSource<User>(this.users)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * get user list from api 
   * @returns 
   */
  getUsers() {
    return new Promise((resolve, reject) => {
      this.service.getAll(`${ApiUrl.User}/${ApiAction.GetAll}`).subscribe(res => {
        resolve(res);
      }, (err: any) => {
        reject(err)
      });
    });
  }

  /**
   * delete user from data
   * @param id 
   * @returns 
   */
  deleteUser(id: number) {
    return new Promise((resolve, reject) => {
      this.service.delete(ApiUrl.User, id).subscribe(res => {
        resolve(true);
      }, (err: any) => {
        reject(err)
      });
    });
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  edit(id: any) {
    this.OpenDialog('1000ms', '600ms', id)
  }

  /**
   * delete a user
   * @param id given user id 
   */
  delete(id: number) {
    debugger;
    alertify.set('notifier', 'position', 'top-right');
    Swal.fire({
      title: 'Remove Employee',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Remove',
      denyButtonText: `Don't Remove`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const isDeleted = await this.deleteUser(id);
        if (isDeleted) {
          this.users = await this.getUsers() as User[];
          this.dataSource = new MatTableDataSource<User>(this.users)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          alertify.success("The user has been removed successfully");
        } else if (result.isDenied) {
          alertify.success("The user has been failed to remove");
        }
      }
    })

  }

  /**
   * open popup
   * @param enteranimation 
   * @param exitanimation 
   * @param id id of select user
   */
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
