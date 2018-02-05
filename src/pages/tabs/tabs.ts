import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsController } from '../../ionic2-super-tabs';
import { SuperTabs } from '../../ionic2-super-tabs/components/super-tabs';
import firebase from 'firebase';
import { SettingsPage } from '../pages';

@IonicPage({
  segment: 'tabs/:type'
})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage { 
  @ViewChild(SuperTabs) superTabs: SuperTabs;
  page1: any = 'HomePage';
  page2: any = 'FavouritesPage';
  page3: any = SettingsPage;
  // page4: any = 'SearchPage';
  showIcons: boolean = true;
  showTitles: boolean = false;
  pageTitle: string = 'Music Xpress';
  constructor(private navCtrl: NavController, private navParams: NavParams, private superTabsCtrl: SuperTabsController) {
    
    const type = this.navParams.get('type');
    switch(type){
      case 'icons-only':
        this.showTitles = false;
        break;
      case 'titles-only':
        this.showIcons = false;
        break;      
    }
  
    firebase.auth().onAuthStateChanged(function(user){
      if(!user){
        this.navCtrl.setRoot('WelcomePage');
      }
    });
  }

  ngAfterViewInit(){
    this.superTabsCtrl.enableTabsSwipe(true,"mainTabs");
    // this.superTabsCtrl.increaseBadge('page1',10);
    // this.superTabsCtrl.enableTabSwipe('page3',false);
    // this.superTabsCtrl.enableTabSwipe(false);
    // setTimeout(()=>{
    //   this.superTabs.slideTo(4);
    // }, 2000);
  }
  search(){
    this.navCtrl.push('SearchPage');
  }

  onTabSelect(tab:{ index:number; id:string; }){
    console.log(`Selected tab`, tab);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
