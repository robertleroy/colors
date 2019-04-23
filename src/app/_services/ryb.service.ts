import { Injectable } from '@angular/core';
import Color from 'jscolor';

@Injectable()
export class RybService {

  constructor() { }

  // utility function to handle adobe translations.
  mapRange(value, fromLower, fromUpper, toLower, toUpper) {
    return (toLower + (value - fromLower) * ((toUpper - toLower) / (fromUpper - fromLower)));
  }

  // These two functions are ripped straight from Adobe Kuler source.
  // They convert between scientific hue to the color wheel's "artistic" hue.

  ryb2rgb(hue) {
    return (
      hue < 60 ? hue * (35 / 60) :
        hue < 122 ? this.mapRange(hue, 60, 122, 35, 60) :
          hue < 165 ? this.mapRange(hue, 122, 165, 60, 120) :
            hue < 218 ? this.mapRange(hue, 165, 218, 120, 180) :
              hue < 275 ? this.mapRange(hue, 218, 275, 180, 240) :
                hue < 330 ? this.mapRange(hue, 275, 330, 240, 300) :
                  this.mapRange(hue, 330, 360, 300, 360));
  }

  rgb2ryb(hue) {
    return (
      hue < 35 ? hue * (60 / 35) :
        hue < 60 ? this.mapRange(hue, 35, 60, 60, 122) :
          hue < 120 ? this.mapRange(hue, 60, 120, 122, 165) :
            hue < 180 ? this.mapRange(hue, 120, 180, 165, 218) :
              hue < 240 ? this.mapRange(hue, 180, 240, 218, 275) :
                hue < 300 ? this.mapRange(hue, 240, 300, 275, 330) :
                  this.mapRange(hue, 300, 360, 330, 360));
  }


  rybcomplement(str) {
    const obj = new Color(str);
    obj.h = this.ryb2rgb(((this.rgb2ryb(obj.h) % 360) + 180) % 360) % 360;
    return obj.hex;
  }

  rybtriad(str) {
    const obj = new Color(str);
    let h = obj.h;
    h = this.rgb2ryb(h) % 360;

    const obj2 = new Color({ h: this.ryb2rgb(((this.rgb2ryb(obj.h) % 360) + 120) % 360) % 360, s: obj.s, l: obj.l });

    const obj3 = new Color({ h: this.ryb2rgb(((this.rgb2ryb(obj.h) % 360) + 240) % 360) % 360, s: obj.s, l: obj.l });
    return [
      obj,
      obj2,
      obj3
    ];
  }

  rybtetrad(str) {
    const obj = new Color(str);
    const h = obj.h;
    return [
      obj,
      new Color({ h: this.ryb2rgb(((this.rgb2ryb(obj.h) % 360) + 90) % 360) % 360, s: obj.s, l: obj.l }),
      new Color({ h: this.ryb2rgb(((this.rgb2ryb(obj.h) % 360) + 180) % 360) % 360, s: obj.s, l: obj.l }),
      new Color({ h: this.ryb2rgb(((this.rgb2ryb(obj.h) % 360) + 270) % 360) % 360, s: obj.s, l: obj.l })
    ];
  }

  rybsplitcomplement(str) {
    const obj = new Color(str);
    const h = obj.h;
    return [
      obj,
      new Color({ h: this.ryb2rgb(((this.rgb2ryb(obj.h) % 360) + 150) % 360) % 360, s: obj.s, l: obj.l }),
      // new Color({ h: this.ryb2rgb(((this.rgb2ryb(obj.h) % 360) + 165) % 360) % 360, s: obj.s, l: obj.l }),
      new Color({ h: this.ryb2rgb(((this.rgb2ryb(obj.h) % 360) + 180) % 360) % 360, s: obj.s, l: obj.l }),
      // new Color({ h: this.ryb2rgb(((this.rgb2ryb(obj.h) % 360) + 195) % 360) % 360, s: obj.s, l: obj.l }),
      new Color({ h: this.ryb2rgb(((this.rgb2ryb(obj.h) % 360) + 210) % 360) % 360, s: obj.s, l: obj.l })
    ];
  }

}

