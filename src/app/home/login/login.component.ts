import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
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
  acc: string;
  pass: string;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    this.itemsRef = db.list('items');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
   );
  }

  logIn() {
    this.items = this.db.list('items').valueChanges();
    this.items.forEach(element => {
      element.forEach(item => {
        if (this.acc === item.account && this.pass === item.password) {
          this.db.list('login').update('-LZv7TIJFSE4_l5rVzLn', this.acc);
          this.router.navigate([`../dashboard`], { relativeTo: this.route });
        }
      });
   });
  }
  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigate([`../dashboard`], { relativeTo: this.route });
  }
  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    this.router.navigate([`../dashboard`], { relativeTo: this.route });
  }
}
