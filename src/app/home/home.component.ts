import { Component, OnInit } from '@angular/core';
import { ColorService } from '../_services/color.service';
import { routerFade, fade } from '../_animations/animations';
import Color from 'jscolor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    routerFade, fade
  ]
})

export class HomeComponent implements OnInit {
  favorites = [];
  base: any;
  colorMode: string;
  rgbComplement: any;
  rybComplement: any;
  inverted: any;
  analogous = [];
  triad = [];
  tetrad = [];
  splitComp = [];
  currentScheme = 'analogous';
  currentComplement = 'rgbComplement';

  constructor(private colorService: ColorService) { }

  ngOnInit() {
    this.getColor();
    this.getFavorites();
    this.getColorMode();
  }

  getColorMode() {
    this.colorService.getColorMode().subscribe(res => {
      this.colorMode = res;
      // console.log(res);
    });
  }

  getColor() {
    this.colorService.getColor().subscribe(res => {
      this.base = res;
      // console.log(res);
      this.getComplements();
      this.getAnalogous();
      this.getTriad();
      this.getTetrad();
      this.getSplitComp();
    });
  }

  getComplements() {

    this.rgbComplement = this.colorService.rgbComplement(this.base);
    this.inverted = this.colorService.inverted(this.base);
    this.rybComplement = this.colorService.rybComplement(this.base);
  }

  getAnalogous() {
    const obj = new Color(this.base.hex);
    const obj1 = new Color(this.base.hex);
    const obj2 = new Color(this.base.hex);
    const obj3 = new Color(this.base.hex);
    const obj4 = new Color(this.base.hex);

    obj1.h -= 30 % 360;
    obj2.h -= 15 % 360;
    obj3.h += 15 % 360;
    obj4.h += 30 % 360;
    this.analogous = [obj1, obj2, obj, obj3, obj4,];
  }

  getTriad() {
    const obj = new Color(this.base.hex);
    const obj1 = new Color(this.base.hex);
    const obj2 = new Color(this.base.hex);

    obj1.h -= 120 % 360;
    obj2.h += 120 % 360;
    this.triad = [obj1, obj, obj2];
  }

  getTetrad() {
    const obj = new Color(this.base.hex);
    const obj1 = new Color(this.base.hex);
    const obj2 = new Color(this.base.hex);
    const obj3 = new Color(this.base.hex);

    obj1.h -= 30 % 360;
    obj2.h += 180 % 360;
    obj3.h += 150 % 360;
    this.tetrad = [obj, obj1, obj2, obj3];
  }

  getSplitComp() {
    const obj = new Color(this.base.hex);
    const obj1 = new Color(this.base.hex);
    const obj2 = new Color(this.base.hex);
    const obj3 = new Color(this.base.hex);
    const obj4 = new Color(this.base.hex);
    const obj5 = new Color(this.base.hex);

    obj1.h -= 150 % 360;
    obj2.h -= 165 % 360;
    obj3.h -= 180 % 360;
    obj4.h += 165 % 360;
    obj5.h += 150 % 360;
    // this.splitComp = [ obj, obj1, obj2, obj3, obj4, obj5];

    this.splitComp = [obj2, obj, obj4];
  }

  getFavorites() {
    this.colorService.getFavorites().subscribe(res => {
      this.favorites = res;
      // console.log(this.favorites);
    });
  }

  updateFavorites(obj) {
    this.favorites.push(obj);
    this.colorService.updateFavorites(this.favorites);
  }

  colorClick(obj) {
    // this.colorService.updateColor(obj);
  }

}
