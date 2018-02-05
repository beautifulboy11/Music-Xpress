import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AudioPlayerPage } from '../audioplayer/audioplayer';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {
  favourites: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritesPage');
    this.storage.get("favourites").then((value) => {
      if(value){
        this.favourites = value;
      }
    });
  }

  
  play(){
    this.navCtrl.push(AudioPlayerPage);
  }
}
