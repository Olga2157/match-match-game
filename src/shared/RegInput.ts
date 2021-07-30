import IComponent from '../models/IComponent';

export default class RegInputDiv implements IComponent {
  public regInputDiv: HTMLDivElement;

  constructor(
    public regInputLabelText: string,
    public regInputLabelDesc: string,
    public regInputId: string,
    public regInputType: string,
  ) {
    this.regInputDiv = document.createElement('div');
  }

  public init(): void {
    this.regInputDiv.classList.add('form-control');

    const regInputLabel = document.createElement('label');
    const regInputLabelText = document.createTextNode(this.regInputLabelText);
    regInputLabel.appendChild(regInputLabelText);

    const regInput = document.createElement('input');
    regInput.setAttribute('type', this.regInputType);
    regInput.setAttribute('placeholder', this.regInputLabelDesc);
    regInput.id = this.regInputId;

    const inputSmall = document.createElement('small');
    const inputSmallText = document.createTextNode('Error message');
    inputSmall.appendChild(inputSmallText);

    this.regInputDiv.appendChild(regInputLabel);
    this.regInputDiv.appendChild(regInput);
    this.regInputDiv.appendChild(inputSmall);

    const form = document.getElementById('form');
    form?.appendChild(this.regInputDiv);
  }

  public get curRegInputDiv() {
    return this.regInputDiv;
  }
}
