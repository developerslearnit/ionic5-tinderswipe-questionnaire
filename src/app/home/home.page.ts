import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { GestureController, IonCard, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements AfterViewInit {

  questions = [
    {
      'id': 1,
      'question': "Do you have more than one source of income?"
    },
    {
      'id': 2,
      'question': "Do you have a car?"
    },
    {
      'id': 3,
      'question': "Do you pay rent?"
    },
    {
      'id': 4,
      'question': "Do you have more than one kid?"
    },
    {
      'id': 5,
      'question': "Do you know ionicframework?"
    }

  ]

  @ViewChildren(IonCard, { read: ElementRef }) tinderCards: QueryList<ElementRef>;
  constructor(private getstureCtrl: GestureController, private platform: Platform) {

  }


  ngAfterViewInit() {
    const tinderCardArray = this.tinderCards.toArray();
    this.setGesture(tinderCardArray);
  }

 
  setGesture(cards) {

    for (let c = 0; c < cards.length; c++) {

      const card = cards[c];

      const gesture = this.getstureCtrl.create({
        el: card.nativeElement,
        gestureName: 'swipe',
        onStart: ev => {

        },
        onMove: ev => {
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
        },
        onEnd: ev => {
          card.nativeElement.style.transition = '.5s ease-out';
          if (ev.deltaX > this.platform.width() / 2.25) {

            card.nativeElement.style.transform = `translateX(${this.platform.width() * 3}px) rotate(${ev.startX / 2}deg)`

          } else if (ev.deltaX < -this.platform.width() / 2.25) {
            card.nativeElement.style.transform = `translateX(-${this.platform.width() * 3}px) rotate(${ev.startX / 2}deg)`

          } else {
            card.nativeElement.style.transform = '';
          }

        }
      });

      gesture.enable(true);

    }

  }


}
