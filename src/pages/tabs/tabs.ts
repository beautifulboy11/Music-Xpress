import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage { 
  tab1Root: any = 'HomePage';
  tab2Root: any = 'FavouritesPage';
  tab3Root: any = 'SettingsPage';
  tab4Root: any = 'SearchPage';

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1Title = 'Home';
    this.tab2Title = 'My Music';
    this.tab3Title = 'Settings';
    this.tab4Title = 'Search';
    firebase.auth().onAuthStateChanged(function(user){
      if(!user){
        navCtrl.setRoot('WelcomePage');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
