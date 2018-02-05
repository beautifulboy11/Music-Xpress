import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController,App } from 'ionic-angular';
import { Api } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = {};
  artist = [];
  albums = [];
  tracks = [];
  create: boolean = false;
  loading: any;
  results = [];

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private api: Api,
    public alertCtrl: AlertController,
    private menu: MenuController,
    private appCtrl: App
  ) { }

  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = {};
      return;
    }

    this.api.get('search?q=' + val)
      .subscribe((res) => {
        this.currentItems = {};
        let Items = res["data"];
        let alb = [];
        let tra = [];
        let art = [];
        for (let index = 0; index < Items.length; index++) {
          let item = Items[index];
          alb.push(item["album"]);
          art.push(item["artist"]);
          tra.push(item);
        }
        this.albums = this.filterUnique(alb);
        this.artist = this.filterUnique(art);
        this.tracks = this.filterUnique(tra);
        
        console.info(this.albums);
        this.create = true;
      }, error => {
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
  }

  filterUnique(Arr): any {
    var unique = []; var temp =[];
    for (let i = 0; i < Arr.length; i++) {
      let current = Arr[i];
      if (temp.indexOf(current["id"]) < 0)
        unique.push(current);
        temp.push(current["id"]);
    }
    return unique;
  }

  openItem(item: any) {
   
    this.appCtrl.getRootNav().push('AudioPlayerPage', {
      item: item
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  // ionViewDidEnter() {
  //   // the root left menu should be disabled on the tutorial page
  //   this.menu.enable(false);
  // }
  // ionViewWillLeave() {
  //   // enable the root left menu when leaving the tutorial page
  //   this.menu.enable(true);
  // }

}


