import {ElementRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  scrollToFirstInvalidControl(elementRef: ElementRef) {
    setTimeout(() => {
      const firstInvalidControl: HTMLElement = elementRef.nativeElement.querySelector('form .ng-invalid');
      firstInvalidControl.scrollIntoView({behavior: 'smooth'});
    }, 0);
  }

}
