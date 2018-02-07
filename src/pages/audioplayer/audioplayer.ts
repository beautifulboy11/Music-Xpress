import { Component, Provider } from '@angular/core';
import { IonicPage, NavParams, MenuController } from 'ionic-angular';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';
import { MediaPlayerComponent } from '../../components/media-player/media-player';

@IonicPage()
@Component({
  selector: 'page-audioplayer',
  templateUrl: 'audioplayer.html',
})
export class AudioPlayerPage {
  tracks: any[];
  allTracks: any[];
  player: any;
  selectedTrack: any;
  //@ViewChild('audio') audio;
 
  trac: string = "../../assets/AfunikaTebwalwaBomfya.mp3";
  playing: boolean = true;
  currentTrack: any;
  progressInterval: any;
  shuffle: boolean = false;
  played: number;
  trackDuration: number;
  source: any;
  backgroundImage: any;
  States = { Ready: 0, Playing: 1, Loading: 2, Error: 3 };
  album = { cover: "https://e-cdns-images.dzcdn.net/images/artist/25b666aaa555d123738dc81c95a0f723/500x500-000000-80-0-0.jpg" }
 
  item: any;
  constructor(private params: NavParams, private menu: MenuController)
  {
    this.item =  this.params.data;
    console.info(this.params);      
        
    this.tracks = [   
      {source: 'http://indimba.com/download.php?dfdc1fdf0be9fb61ddb7bedbbfdb153d=62', title: 'Sample Song', artist: 'Sample Tune', playing: false, progress:0 },
      {source:'http://indimba.com/download.php?dfdc1fdf0be9fb61ddb7bedbbfdb153d=2838', title: 'TebwalwaBomfya', artist: 'Afunika', playing: false, progress: 0 },
      {source:'../../assets/Afunika_Dj_Wandetelela.mp3', title: 'Dj Wandetelela', artist: 'Afunika', playing: false, progress: 0 },
      {source:'../../assets/No Title - DRiMZ Mr Music.mp4.mp3', title: 'No Title', artist: 'DRiMZ Mr Music', playing: false, progress: 0 },     
    ];
    this.currentTrack = this.tracks[0];
    this.player = new Audio();  
    this.backgroundImage = this.album.cover;
  } 

  ionViewDidLoad() {
      
  }
         
  onTrackFinished(track: any) {
    console.log('Track finished', track)
  } 
   
  ionViewDidEnter() {   
    this.menu.enable(false);
  }

  ionViewWillLeave() {   
    this.menu.enable(true);
  }
 
  shuffleSong(){
    this.shuffle = true;
  }
  shuffleOff(){
    this.shuffle = false;
  }
  
  play (track) {    
    for (let checkTrack of this.tracks) {
      if (checkTrack.playing) {
        this.pause(checkTrack);
      }
    }
     
    track.playing = true;    
    this.player.src = track.source;
    this.player.play();
    this.currentTrack = track;

    this.progressInterval = setInterval(() => {
      this.played = this.player.currentTime;
      this.trackDuration = this.player.duration;
      track.progress < this.player.duration ? track.progress = this.player.currentTime : track.progress = 0;
    }, 1000);
  }

  playEnded(){}

  pause = function (track) {
    track.playing = false;
    clearInterval(this.progressInterval);
    this.player.pause();
  }

  nextSong = function () {   
    let index = this.tracks.indexOf(this.currentTrack);
    index >= this.tracks.length - 1 ? index = 0 : index++;

    this.play(this.tracks[index]);
  }

  previousSong () {    
    let index = this.tracks.indexOf(this.currentTrack);
    index > 0 ? index-- : index = this.tracks.length - 1;

    this.play(this.tracks[index]);
  }

  goToSong = function (index) {
    var wasPlaying;
    this.currentSong = index;
    wasPlaying = this.audioPlayer.isPlaying();
    this._updateSourceAttributes(index);
    this._updateImageAttributes(index);
    this.$name[0].innerHTML = this.songs[index].name;
    this.audioPlayer.setEl(this.audioEl);
    this.$progressBar.css({
      width: 0
    });
    this.audioPlayer.load();
    if (wasPlaying) {
      return this.audioPlayer.play();
    }
  }

  load = function () {
    return this.el.load();
  }

  duration = function () {
    return this.el.duration;
  }

  seekTo = function (time) {
    return this.el.currentTime = parseInt(time, 10);
  }

  percentComplete = function () {
    var number;
    number = ~~((this.el.currentTime / this.el.duration) * 10000);
    return number / 10000;
  }

  togglePlayPause = function () {
    if (this.audioPlayer.isPlaying()) {
      return this.audioPlayer.pause();
    } else {
      return this.audioPlayer.play();
    }
  }            
}


