import RegistrationForm from './RegistrationForm';
import Routing from '../services/Routing';
import { ActivePages } from '../models/enums/ActivePages';
import NavButton from '../shared/NavButton';
import Config from '../Config';

export default class NavigationPanel {
  private static readonly invisibleClass = 'invisible';

  public static init(): void {
    const header = document.createElement('header');

    const headerContainer = document.createElement('div');
    header.appendChild(headerContainer);
    headerContainer.classList.add('header-container');

    const headerLogo = document.createElement('div');
    headerLogo.classList.add('header-logo');

    const nav = document.createElement('nav');
    nav.classList.add('navigation-buttons');

    const userArea = document.createElement('div');
    userArea.classList.add('user-area');

    headerContainer.appendChild(headerLogo);
    headerContainer.appendChild(nav);
    headerContainer.appendChild(userArea);

    const buttonRegister = document.createElement('button');
    buttonRegister.classList.add('register-button');
    const buttonRegisterText = document.createTextNode(Config.REGISTER_TEXT);
    buttonRegister.id = 'registrId';
    buttonRegister.appendChild(buttonRegisterText);

    const startGame = document.createElement('button');
    startGame.classList.add('start-button');
    startGame.classList.add(NavigationPanel.invisibleClass);
    const startGameText = document.createTextNode('START GAME');
    startGame.id = 'startGame';
    startGame.appendChild(startGameText);

    const stopGame = document.createElement('button');
    stopGame.classList.add('stop-button');
    stopGame.classList.add(NavigationPanel.invisibleClass);
    const stopGameText = document.createTextNode('STOP GAME');
    stopGame.id = 'stopGame';
    stopGame.appendChild(stopGameText);

    userArea.appendChild(buttonRegister);
    userArea.appendChild(startGame);
    userArea.appendChild(stopGame);

    const goTopageFunc = Routing.goToPage;

    startGame.addEventListener('click', () => {
      goTopageFunc(ActivePages.GamePage);
    });
    stopGame.addEventListener('click', () => {
      goTopageFunc(ActivePages.AboutGamePage);
    });

    buttonRegister.addEventListener('click', () => {
      const registrationForm = new RegistrationForm();
      registrationForm.init();
    });

    document.body.appendChild(header);

    new NavButton('About Game', ActivePages.AboutGamePage, true).init();
    new NavButton('Best Score', ActivePages.BestScorePage).init();
    new NavButton('Game Settings', ActivePages.GameSettingsPage).init();
  }
}
