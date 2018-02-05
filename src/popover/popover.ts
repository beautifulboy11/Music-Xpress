import { Component } from "@angular/core/src/metadata/directives";
import { ViewController } from "ionic-angular/navigation/view-controller";

@Component({
    templateUrl:'./popover.html'
})
export class PopoverPage{
    constructor(public viewCtrl: ViewController){}
    close() {
        this.viewCtrl.dismiss();
      }
}