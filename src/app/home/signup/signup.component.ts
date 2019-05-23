import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  mailm: string;
  accountm: string;
  passwordm: string;
  age: string;
  boolAcc: boolean;
  boolEmail: boolean;
  items: Observable<any>;
  itemsRef: AngularFireList<any>;

  constructor(private router: Router, public db: AngularFireDatabase) {}

  ngOnInit() {}
  async blr() {
    this.boolAcc = false;
    this.boolEmail = false;
    const response = await this.itemsRef.valueChanges().subscribe(element => {
      // tslint:disable-next-line:prefer-const
      for (let item of element) {
        if (this.accountm === item.account) {
          this.boolAcc = true;
        }
        if (this.mailm === item.email) {
          this.boolEmail = true;
        }
      }
    });
    return response;
  }

  pre() {
    const data = {
      email: this.mailm,
      account: this.accountm,
      password: this.passwordm,
      age: new Date(this.age)
    };
    this.db.list('items').push(data);
    this.router.navigateByUrl('/welcome/login');
  }

  onSubmit() {
    this.pre();
  }
}
