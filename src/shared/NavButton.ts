import IComponent from '../models/IComponent';
import Routing from '../services/Routing';
import { ActivePages } from '../models/enums/ActivePages';

export default class NavButton implements IComponent {
  constructor(public textButton: string,
    public page: ActivePages,
    public active: boolean = false) {
  }

  public init(): void {
    const button = document.createElement('button');
    const buttonText = document.createTextNode(this.textButton);
    button.appendChild(buttonText);
    if (this.active) {
      button.classList.add('active-route');
    }

    const nav = document.querySelector('.navigation-buttons');
    nav?.appendChild(button);

    const goTopageFunc = Routing.goToPage;
    button.addEventListener('click', () => {
      goTopageFunc(this.page);
    });
  }
}
