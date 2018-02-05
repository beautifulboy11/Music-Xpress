import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
 appName: any;
 packageName: any;
 versionCode: any;
 versionNumber: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private appVersion: AppVersion) {
  }

  ionViewDidLoad() {
    this.appVersion.getAppName().then((res) => {
      this.appName = res;
    });
    this.appVersion.getPackageName().then((res) => {
      this.packageName = res;
    });
    this.appVersion.getVersionCode().then((res) => {
      this.versionCode = res;
    });
    this.appVersion.getVersionNumber().then((res) => {
      this.versionNumber = res;
    });
  }

}
