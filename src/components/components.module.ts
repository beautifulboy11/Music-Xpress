import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { MediaPlayerComponent } from './media-player/media-player';
import { BackgroundimageComponent } from './backgroundimage/backgroundimage';


@NgModule({
	declarations: [ProgressBarComponent,
    MediaPlayerComponent,
    BackgroundimageComponent],
	imports: [],
	exports: [
		ProgressBarComponent,
		MediaPlayerComponent,
    BackgroundimageComponent,
	
	]
})
export class ComponentsModule {}
