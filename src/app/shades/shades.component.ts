import { Component, OnInit } from '@angular/core';
import { ColorService } from '../_services/color.service';
import Color from 'jscolor';

@Component({
  selector: 'app-shades',
  templateUrl: './shades.component.html',
  styleUrls: ['./shades.component.scss']
})
export class ShadesComponent implements OnInit {
  base = new Color('#1e90ff');
  colorMode: string;
  // lightShift = 10;
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
      this.monochromatics();
      // console.log(res);
    });
  }

  monochromatics() {
    const hue = this.base.h;
    const sat = this.base.s;
    const x = this.maxItems;
    const arr = [];
    const hexString = this.base.hex;

    const max = 97;
    const min = 20;
    let n = min;
    const increment = (max - min) / (x - 1);

    for (let i = 0; i < x; ++i) {

      arr.push(new Color({
        h: hue,
        s: sat,
        l: n
      }));
      // console.log(n);
      n += increment;
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
