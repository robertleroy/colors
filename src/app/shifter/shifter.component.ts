import { Component, OnInit } from '@angular/core';
import { ColorService } from '../_services/color.service';
import Color from 'jscolor';

@Component({
  selector: 'app-shifter',
  templateUrl: './shifter.component.html',
  styleUrls: ['./shifter.component.scss']
})
export class ShifterComponent implements OnInit {
  base = new Color('#1e90ff');
  colorMode: string;
  hueShift = 15;
  maxItems = 5;
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
      this.updateMix();
      // console.log(res);
    });
  }

  updateMix() {
    const arr = [];
    const hexString = this.base.hex;
    let x = Math.floor((360 / this.hueShift) / 2);
    const z = Math.floor(this.maxItems / 2);

    x = Math.min(x, z);

    for (let i = -x; i <= x; ++i) {
      const obj = new Color(hexString);
      obj.h += this.hueShift * i;
      arr.push(obj);
    }

    if (arr.length > this.maxItems) {
      arr.pop();
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
