import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  template: `<div class="progress-outer">
  <div class="progress-inner" [style.width]="progress + '%'"></div>
</div>`
})
export class ProgressBarComponent {

  @Input('progress') progress;
  
  constructor() {
    console.log('Hello ProgressBarComponent Component');
  }

}
