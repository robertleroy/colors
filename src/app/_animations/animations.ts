import { trigger, transition, style, state, animate, query } from '@angular/animations';


export const fade = trigger('fade', [
  state('void', style({
    opacity: 0
  })),
  transition('void <=> *', animate('0.6s')),
]);


export const routerFade = trigger('routerFade', [
  transition('* <=> *', [
    query(
      ':enter',
      [style({ opacity: 0, position: 'absolute' })],
      { optional: true }
    ),
    query(
      ':leave',
      [style({ opacity: 1, position: 'absolute' }), animate('0.6s', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0, position: 'absolute' }), animate('0.6s', style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);

