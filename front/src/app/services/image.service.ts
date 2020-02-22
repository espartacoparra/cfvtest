import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  base64textString: any[];

  constructor() { }

  onUploadChange(evt: any) {
    const file = evt.target.files;
    var data = [];
    this.base64textString = [];
    for (let index = 0; index < file.length; index++) {
      var f = file[index];
      if (f) {
        const reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(f);
      }

    }
    return this.base64textString;
  }

  handleReaderLoaded(e) {
    this.base64textString.push(btoa(e.target.result));
  }
}
