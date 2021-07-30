import IComponent from '../models/IComponent';
import BestScorePage from './BestScorePage';
import Heading from '../shared/Heading';

export default class CongratulatePopup implements IComponent {
  private readonly congratulatePopup: HTMLElement;

  constructor(public totalSeconds: number) {
    this.congratulatePopup = document.createElement('div');
  }

  public init(): void {
    this.congratulatePopup.classList.add('congratulation-popup-container');
    this.congratulatePopup.id = 'congrat-popup';
    this.congratulatePopup.setAttribute('z-index', '2');

    const wrapper = document.getElementById('wrap');
    wrapper?.appendChild(this.congratulatePopup);

    new Heading('Congratulations!', 'congrat-popup').init();

    const congratulationDetails = document.createElement('p');
    const congratulationDetailsText = document.createTextNode(`You successfully found 
    all matches with time : ${this.totalSeconds} seconds`);
    congratulationDetails.appendChild(congratulationDetailsText);
    this.congratulatePopup.appendChild(congratulationDetails);

    const okButton = document.createElement('button');
    const okButtonText = document.createTextNode('Ok');
    okButton.appendChild(okButtonText);

    okButton.addEventListener('click', CongratulatePopup.handleClick);

    this.congratulatePopup.appendChild(okButton);
  }

  private static handleClick() {
    const newPage = new BestScorePage();
    if (document.getElementById('wrap')) {
      document.getElementById('wrap')?.remove();
    }
    newPage?.init();
  }
}
