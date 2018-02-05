import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { SettingsPage, TabsPage, AudioPlayerPage } from '../pages/pages';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private afAuth: AngularFireAuth, private androidFullScreen: AndroidFullScreen) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = AudioPlayerPage;
      } else {
        this.rootPage = AudioPlayerPage;
      }
    });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.androidFullScreen.isImmersiveModeSupported()
        .then(() => this.androidFullScreen.immersiveMode())
        .catch((error: any) => console.log(error));
    });    
  }

  goToSettings() {
    this.nav.setRoot(SettingsPage);
  }
}




