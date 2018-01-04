import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Api } from '../../providers/providers';
import { Song } from '../../models/song';
import { Songs } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  currentItems: any = {};
  artist = [];
  album = [];
  create: boolean = false;
  loading: any;
  results = [];
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private api: Api,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.api.get('search?q=' + val)
      .subscribe((res) => { 
        this.currentItems = {};            
        this.currentItems = this.filterResult(res, val);
          this.currentItems.forEach(element => {
            this.album.push(element["album"]);
          });
          
          this.currentItems.forEach(element => {
            this.artist.push(element["artist"]);
          });
          
          this.create = true;
          this.loading.dismiss();
                
      }, error => {
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

  query(res: ArrayBuffer, params?: any): any {
    this.results = res["data"];  
    return this.results.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  filterResult(res: ArrayBuffer, val: string): Array<any> {
    return this.query(res, { title: val, name: val, album: val });      
  }

  openItem(item: Song) {
    alert("Selected Item");
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
}


