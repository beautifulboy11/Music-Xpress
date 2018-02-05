import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, App } from 'ionic-angular';
import { Api } from '../../providers/providers';
import { AudioPlayerPage } from '../pages';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: any;
  create: boolean = false;
  tracks: any = {}; albums: any = {}; artists: any = {}; playlists: any = {};
  headerImage: any;
  constructor(private appCtrl: App, private storage: Storage, private navCtrl: NavController,private api: Api, private loadingCtrl: LoadingController, private toastCtrl: ToastController)
  {}

  ionViewDidLoad() {
   this.getContent();
   this.headerImage = 'assets/imgs/yoga.jpg';
  }
  
  
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getContent();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  async getContent() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading',
      spinner: 'bubbles',      
      showBackdrop: false,     
      dismissOnPageChange: true,
    });
    this.loading.present().then(()=> {
      this.api.get('/chart', '', '')
      .subscribe((res) => {
        this.tracks = res["tracks"];
        this.create = true;
        this.albums = res["albums"];
        this.artists = res["artists"];
        this.playlists = res["playlists"];
        this.loading.dismiss();
      }, error => {
        if(error.message.indexOf('Http failure') >= 0){
          error.message = 'Failed to retrieve Data. Please check your internet connection, and try again';
        }
        this.loading.dismiss().then(() => {
          let toast = this.toastCtrl.create({
            position: 'bottom',
            message: error.message,
            showCloseButton: true,
            cssClass: 'toast-message',
            closeButtonText: 'Dismiss',
            dismissOnPageChange: true
          });
          toast.present();
        });
      });
    });           
  }

  addFavourite(item: any) {
    this.storage.set("favourites",item);
  }

  play($event, item) {
    this.appCtrl.getRootNav().push(AudioPlayerPage, item);
  }

  share(item: any) {
    //let popover = this.popoverCtrl.create(PopoverPage);
    //popover.present();
  }



}
