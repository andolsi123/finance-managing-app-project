import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {
  mailm: string;
  accountm: string;
  passwordm: string;
  passwordCm: string;
  age: string;
  items: Observable<any>;
  itemsRef: AngularFireList<any>;

  constructor(public afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute, public db: AngularFireDatabase) {
    this.itemsRef = db.list('items');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    if (this.afAuth.user) {
      this.itemsRef.push({account: this.afAuth.user});
      this.router.navigate([`../dashboard`], { relativeTo: this.route });
    }
  }
  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    if (this.afAuth.user) {
      this.router.navigate([`../dashboard`], { relativeTo: this.route });
    }
  }
  onSubmit() {
    if (this.mailm && this.accountm && this.passwordm) {
      // tslint:disable-next-line:prefer-const
      let data = {
        email: this.mailm,
        account: this.accountm,
        password: this.passwordm,
        age: this.age
      };
      if (this.passwordm === this.passwordCm) {
        this.itemsRef.push(data);
        this.router.navigate([`../login`], { relativeTo: this.route });
      }
    }
  }
}
