import { Auth } from '../../providers/providers';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: Auth) {
  }

  ionViewDidLoad()
  {    
    this.userProfile = this.authProvider.getUser();
  }

  logout(){
    this.authProvider.logoutUser();
  }

}
