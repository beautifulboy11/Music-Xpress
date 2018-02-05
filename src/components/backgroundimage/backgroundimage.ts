import { Component } from '@angular/core';
import {Directive, ElementRef, Input} from '@angular/core';
 
@Directive({
    selector: '[background-image]'
})
export class BackgroundimageComponent {
    private el: HTMLElement;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    @Input('background-image') backgroundImage: string;

    ngAfterViewInit() {
        this.el.style.backgroundImage = 'url(' + this.backgroundImage + ')';
    }
 
}