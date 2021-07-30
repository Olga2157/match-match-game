import IComponent from '../models/IComponent';

export default class ImageDiv implements IComponent {
  public imageDiv: HTMLDivElement;

  constructor(
    public divClass: string,
    public imgSrc: string,
    public imgAlt: string,
  ) {
    this.imageDiv = document.createElement('div');
  }

  public init(): void {
    this.imageDiv.classList.add(this.divClass);
    const img = document.createElement('img') as HTMLImageElement;
    img.src = this.imgSrc;
    img.alt = this.imgAlt;
    this.imageDiv.appendChild(img);
  }

  public get curImageDiv() {
    return this.imageDiv;
  }
}
