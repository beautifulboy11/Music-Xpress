import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';

export interface Slide{
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {
  slides: Slide [];
  showSkip = true;
  dir: string = 'ltr';
  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, private menu: MenuController) {
    this.dir = platform.dir();
    this.slides =[
      {
        title: '',
        description: '',
        image: 'assets/imgs/welcomeLogo.png',
      },
      {
        title: 'Latest Music',
        description: '',
        image: 'assets/imgs/XpressLogo.png',
      }
    ]; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPage');
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  startApp() {
    this.navCtrl.setRoot('LoginPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
