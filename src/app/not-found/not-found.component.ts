import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  animations: [
    trigger('zoomIn', [
      state('void', style({ transform: 'scale(0.8)', opacity: 0 })),
      transition(':enter', [
        animate('0.5s ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class NotFoundComponent {}