import { Component, OnInit } from '@angular/core';
import { routerFade, fade } from './_animations/animations';
import { ColorService } from './_services/color.service';
import Color from 'jscolor';
// https://github.com/robertgonzales/jscolor

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routerFade, fade
  ]
})
export class AppComponent implements OnInit {
  colorMode = 'hex';
  baseString = '#1e90ff';
  base: any;
  rgbComplement: any;
  favorites = [];
  dodgerblue = new Color('#1e90ff');

  constructor(private colorService: ColorService) { }

  ngOnInit() {
    // this.base = new Color(this.baseString);
    this.updateColor();
    this.getColor();
    this.getFavorites();
    this.updateColorMode();
  }

  updateColor() {
    this.hexCheck();
    this.base = new Color(this.baseString);
    this.rgbComplement = this.colorService.rgbComplement(this.base);
    this.updateHue(this.base.h);
    this.colorService.updateColor(this.base);
  }

  getColor() {
    this.colorService.getColor().subscribe(res => {
      this.base = res;
      this.updateString(this.base);
    });
    this.rgbComplement = this.colorService.rgbComplement(this.base);
    this.updateHue(this.base.h);
    // this.updateString(this.base);
  }

  changeHsl() {
    this.baseString = this.base.hsl;
    this.colorMode = 'hsl';
    this.updateColorMode();
  }

  changeRgb() {
    this.baseString = this.base.rgb;
    this.colorMode = 'rgb';
    this.updateColorMode();
  }

  hexCheck() {
    let str = this.baseString.trim();
    const test = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(str);
    if (test) {
      str = ('#').concat(str);
    }
    this.baseString = str;

    if (this.baseString.startsWith('#')) {
      this.colorMode = 'hex';
      this.updateColorMode();
    }
  }

  updateHue(h) {
    document.documentElement.style.setProperty(`--hue`, h);
  }

  getFavorites() {
    this.colorService.getFavorites().subscribe(res => {
      this.favorites = res;
      // console.log(res);
    });
  }

  updateFavorites(str) {
    const obj = new Color(str);
    this.favorites.push(obj);
    this.colorService.updateFavorites(this.favorites);
  }

  removeFavorite(i) {
    this.favorites.splice(i, 1);
    this.colorService.updateFavorites(this.favorites);
  }

  updateColorMode() {
    this.colorService.updateColorMode(this.colorMode);
  }

  updateString(obj) {
    switch (this.colorMode) {
      case 'hex':
        this.baseString = obj.hex;
        break;
      case 'rgb':
        this.baseString = obj.rgb;
        break;
      case 'hsl':
        this.baseString = obj.hsl;
        break;
      default:
    }
  }

  colorClick(obj) {
    this.colorService.updateColor(obj);
  }

  dodgerBlue() {
    const obj = new Color('#1e90ff');
    this.colorService.updateColor(obj);
  }

}

