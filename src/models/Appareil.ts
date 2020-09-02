export class Appareil {
  name: string;
  description: string[];
  isOn: boolean;
  image : any;


  constructor(name: string,image : any) {
    this.name = name;
    this.isOn = false;
    this.image=image;
  }
}
