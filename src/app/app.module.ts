import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MyApp } from './app.component';
// import { IonicAudioModule, AudioProvider } from 'ionic-audio';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook'
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { AppVersion } from '@ionic-native/app-version';
import { Settings, Api, Auth, Songs} from '../providers/providers';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { AudioPlayerPage, SettingsPage, TabsPage, AboutPage } from '../pages/pages';
import { MediaPlayerComponent } from '../components/media-player/media-player';
import { SuperTabsModule } from '../ionic2-super-tabs';
import { StreamingMedia} from '@ionic-native/streaming-media';
import { VolumeSlider } from '../components/volume-slider/volume-slider.component';

import { DurationFormatter } from '../common/pipes/duration-formatter';

import { GoogleAnalyticsTracker } from '../common/tracking/google-analytics-tracker.provider';

import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';
import { StorageProvider } from '../providers/storage/storage';
export function myCustomAudioProviderFactory() {
  return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}

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
    MyApp,      
    ProgressBarComponent,
    MediaPlayerComponent,  
    AudioPlayerPage,
    SettingsPage,
    TabsPage,
    VolumeSlider,   
    DurationFormatter,
    AboutPage
    
  ],

  imports: [
    IonicAudioModule.forRoot(defaultAudioProviderFactory),
    BrowserModule,
    HttpClientModule, 
    SuperTabsModule.forRoot(),  
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }),
    IonicStorageModule.forRoot(),    
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,    
    AngularFireDatabaseModule,     
 ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp ,
    AudioPlayerPage,
    SettingsPage,
    TabsPage,
    VolumeSlider,
    AboutPage
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
    Api,
    StreamingMedia ,   
    GoogleAnalyticsTracker,
    AndroidFullScreen,
    AppVersion,
    StorageProvider  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
