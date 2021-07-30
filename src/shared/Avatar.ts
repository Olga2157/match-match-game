import IComponent from '../models/IComponent';

export default class Avatar implements IComponent {
  public userImageDiv: HTMLDivElement;

  constructor(
    public base64Str: string,
    public imgData: string,
  ) {
    this.userImageDiv = document.createElement('div');
  }

  public init(): void {
    this.userImageDiv.classList.add('avatar');
    const htmlImageElement = document.createElement('img');
    htmlImageElement.src = `${this.base64Str}${this.imgData}`;
    this.userImageDiv.appendChild(htmlImageElement);
  }

  public get avatarDiv() {
    return this.userImageDiv;
  }
}
