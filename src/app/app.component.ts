import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth, private backgroundMode: BackgroundMode)
  {          
    platform.ready().then(() => {     
      statusBar.styleDefault();
      splashScreen.hide();     
    });
    
    afAuth.authState.subscribe( user => {
      if (user){
        this.rootPage = "TabsPage";
      } else {
        this.rootPage = "SliderPage";
      }
    });   
  
  }
}



