import { Injectable, Output, EventEmitter } from '@angular/core';

/* Firebase Auth */
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  @Output() onAuthChangeSucess: EventEmitter<any> = new EventEmitter();
  @Output() onAuthChangeError: EventEmitter<any> = new EventEmitter();

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(data => {
      if (data !== null) {
        localStorage.setItem('fbState', JSON.stringify(data));
        this.onAuthChangeSucess.emit(data);
      } else {
        this.onAuthChangeError.emit(data);
      }
    });
  }

  doLogin(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut().catch(
      authData => {
        this.onAuthChangeError.emit({ authData });
      }
    );
  }

  get fbUser() {
    const fbuser = localStorage.getItem('fbState');
    return JSON.parse(fbuser);
  }

  get isLogged(): boolean {
    return (this.fbUser != null && this.fbUser !== undefined);
  }
}
