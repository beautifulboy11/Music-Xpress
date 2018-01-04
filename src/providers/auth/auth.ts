import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class Auth {
  public fireAuth: any;
  public userData: any;
  constructor(   
    public http: HttpClient,
    public afAuth: AngularFireAuth,
    public facebook: Facebook,
    public googlePlus: GooglePlus,
    
  ) {
    console.log('Hello AuthProvider Provider');
    this.fireAuth = firebase.auth();
  }
  getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  googleLogin(): Promise<any> {
    return this.googlePlus
      .login({
        webClientId:
        '672181354070-b5rtgebobmht0mmlt09kdcms2kl7l61e.apps.googleusercontent.com',
        offline: true
      })
      .then(res => {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          res.idToken
        );

        this.afAuth.auth
          .signInWithCredential(credential)
          .then(success => {
            ('Google Firebase success: ' + JSON.stringify(success));
          })
          .catch(error =>
            console.log('GoogleFirebase failure: ' + JSON.stringify(error))
          );
      })
      .catch(err => console.error('Google Error: ', err));
  }

  facebookLogin(): Promise<any> {
    return this.facebook
      .login(['email'])
      .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
          response.authResponse.accessToken
        );

        this.afAuth.auth
          .signInWithCredential(facebookCredential)
          .then(success => {
            console.log('Facebook Firebase success: ' + JSON.stringify(success));
          })
          .catch(error => {
            console.log('Facebook Firebase failure: ' + JSON.stringify(error));
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
   
  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }
  
  doLogin(email: string, password: string): any {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password);
  }

  signupUser(email:string, password:string): Promise<any>{
    return this.fireAuth
    .createUserWithEmailAndPassword(email, password)
    .then((newUser) => {
      firebase
      .database()
      .ref(`/userProfile/${newUser.uid}/email`)
      .set(email);
    })
    .catch(error=> {
      console.log(error);
      throw new Error(error);
    });
  }

  registerUser(email: string, newPassword: string): any {
    return this.fireAuth
    .createUserWithEmailAndPassword(email, newPassword)
    .then((newUser)=>{this.userData.child(newUser.uid).set({email: email});
  });
  }
  
  // logoutUser(): Promise<void>{
  //   const userId: string = firebase.auth().currentUser.uid;
  //   firebase
  //   .database()
  //   .ref(`/userProfile/${userId}`)
  //   .off();
  //   return firebase.auth().signOut();
  // }

  logoutUser(): any {
    return this.fireAuth.signOut();
  }
  
  resetPassword(email: string): Promise<any> {
    return this.fireAuth.sendPasswordResetEmail(email);
  }   
}
