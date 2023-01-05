import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as alertify from 'alertifyjs';
import { AppSettings } from '../Service/master.service';
import { ApiAction } from '../shared/Enums/api-action.enum';
import { ApiUrl } from '../shared/Enums/api-url.enum';
import { StatusEnum } from '../shared/Enums/status.enum';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css']
})
export class ModalpopupComponent implements OnInit {



  //#region 
  statusEnum: typeof StatusEnum = StatusEnum;
  isModif = false;
  desdata: any;
  respdata: any;
  oldUser: any;
  form: any;
  //#endregion

  constructor(private service: AppSettings, public dialogRef: MatDialogRef<ModalpopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.createForm();
    if (this.data.id) {
      this.isModif = true;
      this.setData(this.data.id);
    } else {
      this.isModif = false;
    }
  }

  /**
   * Create form
   */
  createForm() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      birthday: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      status: new FormControl(StatusEnum.Enabled),
    });
  }



  /**
   * get a user with give id and set the gitten object in form
   * @param id 
   */
  setData(id: any) {
    this.service.getById(`${ApiUrl.User}`, id).subscribe((item: any) => {
      this.oldUser = item;
      this.form.setValue({
        name: this.oldUser.name,
        email: this.oldUser.email,
        birthday: this.oldUser.birthday,
        password: this.oldUser.password,
        status: this.oldUser.status,
      })
    });
  }


  /**
   * submit to (Add, Update)
   */
  async submit() {
    if (this.form.valid) {
      let resultCommand = null;
      if (this.isModif) {
        alertify.set('notifier', 'position', 'top-right');

        let dataToUpate: any;
        dataToUpate = this.form.value;
        dataToUpate["id"] = this.data.id;
        resultCommand = await this.updateUser(dataToUpate);
      } else {
        resultCommand = await this.createUser();
      }
      if (resultCommand) {
        if (this.isModif) {
          alertify.success("The user has already been updated successfully");
        } else {
          alertify.success("The user has already been added successfully");
        }
        this.close();
      } else {
        alertify.error("Please Enter valid data")
      }
    }
  }

  /**
   * cancel component
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * create user funtion
   * @returns 
   */
  createUser() {
    return new Promise((resolve, reject) => {
      this.service.create(`${ApiUrl.User}/${ApiAction.Create}`, this.form.value).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err)
      });
    });
  }


  /**
   * update user funtion
   * @param user the given user to upate
   * @returns 
   */
  updateUser(user: any) {
    return new Promise((resolve, reject) => {
      this.service.update(`${ApiUrl.User}/${ApiAction.Update}`, user).subscribe((res: any) => {
        resolve(true);
      }, (err: any) => {
        reject(err)
      });
    });
  }
}
