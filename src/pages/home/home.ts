import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { Api } from '../../providers/providers';
//import { Storage } from '@ionic/storage';
import { Song } from '../../models/song';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 
  loading: any;
  create: boolean = false;
  tracks: any = {};
  albums: any = {};
  artists: any = {};
  playlists: any = {};
  headerImage: any;
  constructor(
    public navCtrl: NavController,
    public api: Api,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ){}
  ionViewDidLoad() {     
    this.getContent();
  }
  ionViewDidEnter(){
    let images = {
      image1: "https://tpc.googlesyndication.com/simgad/318205220054980757",
      image2: "https://farm9.staticflickr.com/8059/28286750501_dcc27b1332_h_d.jpg"
  }
    setTimeout(() => {
      console.log('Async operation has ended');
      this.headerImage = images["image2"];
    }, 1000);
  }
  addFavourite(item: Song){
   alert(item);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getContent();        
     setTimeout(() => {
       console.log('Async operation has ended');
       refresher.complete();
     }, 1000);
  }

  async getContent(){
    this.api.get('/chart','','')
    .subscribe((res)=>{      
      this.tracks = res["tracks"];
      this.create = true;
      this.albums = res["albums"];
      this.artists = res["artists"];
      this.playlists = res["playlists"];
      this.loading.dismiss();
      console.log("Data Obtained from Deezer : " + this.tracks);
    },error => {
      this.loading.dismiss().then(() => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }]
        });
        alert.present();
      });
    });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }   
}
