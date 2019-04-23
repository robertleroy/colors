import { Component, OnInit } from '@angular/core';
import { ColorService } from '../_services/color.service';
import Color from 'jscolor';

@Component({
  selector: 'app-morph',
  templateUrl: './morph.component.html',
  styleUrls: ['./morph.component.scss']
})
export class MorphComponent implements OnInit {
  base = new Color('#1e90ff');
  colorMode: string;
  hueShift = 0;
  satShift = -10;
  lightShift = 5;
  maxItems = 7;
  colors = [];
  favorites = [];

  constructor(private colorService: ColorService) { }

  ngOnInit() {
    this.getColor();
    this.getFavorites();
    this.getColorMode();
  }

  getColor() {
    this.colorService.getColor().subscribe(res => {
      this.base = res;
      this.shift();
    });
  }

  shift() {

    const oldHue = this.base.h;
    const oldSat = this.base.s;
    const oldLight = this.base.l;
    const arr = [];

    for (let i = 0; i < this.maxItems; ++i) {
      const obj = new Color({
        h: (oldHue + this.hueShift * i) % 360.1,
        s: (oldSat + this.satShift * i) % 100.1,
        l: (oldLight + this.lightShift * i) % 100.1
      });

      arr.push(obj);
    }

    this.colors = arr;
  }

  getFavorites() {
    this.colorService.getFavorites().subscribe(res => {
      this.favorites = res;
    });
  }
  updateFavorites(obj) {
    this.favorites.push(obj);
    this.colorService.updateFavorites(this.favorites);
  }

  getColorMode() {
    this.colorService.getColorMode().subscribe(res => {
      this.colorMode = res;
    });
  }

  swapColors() {
    this.colors.reverse();
  }

  colorClick(obj) {
    // this.colorService.updateColor(obj);
  }

}
