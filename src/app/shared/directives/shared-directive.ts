import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[characterStatus]',
})
export class CharacterStatusDirective implements OnInit {
  @Input('characterStatus') status: string;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.setStyleBasedOnStatus();
  }

  private setStyleBasedOnStatus(): void {
    switch (this.status.toLocaleLowerCase()) {
      case 'alive':
        this.elementRef.nativeElement.classList.add('character-status--alive');
        break;
      case 'dead':
        this.elementRef.nativeElement.classList.add('character-status--dead');
        break;
      default:
        this.elementRef.nativeElement.classList.add(
          'character-status--unknown'
        );
        break;
    }
  }
}
