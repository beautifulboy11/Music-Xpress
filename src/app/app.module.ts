import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook'

import { Auth } from '../providers/auth/auth';
import { Songs } from '../providers/songs/songs';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { Api } from '../providers/api/api';
import { Settings } from '../providers/providers';

export const config = {
  apiKey: "AIzaSyCWuPcx5uyBhvD6g2s-nf2jTmh4S2DCWPA",
  authDomain: "musicxpress-80976.firebaseapp.com",
  databaseURL: "https://musicxpress-80976.firebaseio.com",
  projectId: "musicxpress-80976",
  storageBucket: "musicxpress-80976.appspot.com",
  messagingSenderId: "672181354070",    
};

export function provideSettings(storage: Storage) {  
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,    
    AngularFireDatabaseModule
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp    
  ],

  providers: [            
    HttpClient,
    StatusBar,
    GooglePlus,
    Facebook,
    SplashScreen,   
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Auth,
    Songs,
    Api    
  ]
})
export class AppModule {}
