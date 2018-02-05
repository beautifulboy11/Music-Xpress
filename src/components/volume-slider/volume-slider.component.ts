import { Component } from '@angular/core';
// import { Store } from "@ngrx/store";
//import { AppState } from "../../common/state";
//import { getVolume } from "../../common/player/player.selectors";
//import { CommonPlayerActions } from "../../common/player/player.actions";

@Component({
	selector: 'volume-slider',
	template: `
		<ion-item>
			<ion-range
				min="0"
				max="100"
				step="10"
				snaps="false"
				color="dark"
				[(ngModel)]="sliderValue"
				(ionChange)="onRangeChanged()">

				<ion-icon range-left name="volume-mute"></ion-icon>
     			<ion-icon range-right name="volume-up"></ion-icon>
			</ion-range>
		</ion-item>
	`,
})
export class VolumeSlider {

	sliderValue: number;

	constructor(
		//private store: Store<AppState>,
		//private playerActions: CommonPlayerActions,
	) 
	{
		//this.store.select(getVolume)
		//	.subscribe(volume => this.sliderValue = volume);
	}

	onRangeChanged(evt) {
		//this.store.dispatch(this.playerActions.setVolume(this.sliderValue));
	}

}
