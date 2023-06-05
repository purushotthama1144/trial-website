import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'img'
})

export class LazyloadingDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }
}