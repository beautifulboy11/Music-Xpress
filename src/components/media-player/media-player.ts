import { Component, Output, Input , EventEmitter, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'media-player',
  template: `<audio src="" #player style="display: block" (ended)="playerEnded()"></audio>`
})
export class MediaPlayerComponent implements OnInit {

  @ViewChild('player') audio;

  @Output() output = new EventEmitter();
  @Input('songlist') songlist: any[];
  @Input('backgroundImage') backgroundImage: string;
  player: any;
 
  constructor() {
    console.log("Can play through "); 
  }


  ngOnInit(){
    this.player = this.audio.nativeElement;
  }

  ngAfterViewInit(){
    this.audio.nativeElement.oncanplaythrough = () =>{          
      let player = this.audio.nativeElement;
      // player.src = this.songlist[0].source;
      // player.play();
    };
  }
    
}
