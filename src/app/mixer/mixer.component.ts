import { Component, OnInit } from '@angular/core';
import { ColorService } from '../_services/color.service';
import Color from 'jscolor';

@Component({
  selector: 'app-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.scss']
})
export class MixerComponent implements OnInit {
  color1 = new Color('#1e90ff');
  color2String = '#1e90ff';
  color2 = new Color('#1e90ff');
  colorMode: string;
  steps = 5;
  colors = [];
  favorites = [];

  constructor(private colorService: ColorService) { }

  ngOnInit() {
    this.color2.l += 40 % 100;
    this.color2String = this.color2.hex;
    this.getColor();
    this.getFavorites();
    this.getColorMode();
  }


  getColor() {
    this.colorService.getColor().subscribe(res => {
      this.color1 = res;
      this.updateMix();
      // console.log(res);
    });
  }

  updateMix() {
    this.color2 = new Color(this.color2String);
    this.colors = this.colorService.blend(this.color1.hex, this.color2.hex, this.steps);

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
