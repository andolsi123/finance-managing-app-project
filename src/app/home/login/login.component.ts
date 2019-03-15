import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent  {

  items: Observable<any[]>;
  itemsRef: AngularFireList<any[]>;
  login: Observable<any[]>;
  account: string;
  password: string;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, private router: Router) {
    this.itemsRef = db.list('items');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
   );
  }

  logIn(log) {
    this.items = this.db.list('items').valueChanges();
    this.items.forEach(element => {
      element.forEach(item => {
        if ((this.account === item.account || this.account === item.email) && this.password === item.password) {
          this.db.list('login').update('-LZv7TIJFSE4_l5rVzLn', {log: this.account});
          this.router.navigate([`/dashboard`]);
        }
      });
   });
  }

}
