import ButtonResolver from '../models/classes/ButtonResolver';
import IComponent from '../models/IComponent';
import Footer from './Footer';
import ImageDiv from '../shared/ImageDiv';
import GameStepDiv from '../shared/GameStepDiv';
import Heading from '../shared/Heading';

export default class AboutGamePage implements IComponent {
  private footer: Footer;

  constructor() {
    this.footer = new Footer();
  }

  public init(): void {
    let main = document.getElementsByTagName('main')[0];
    if (!main) {
      main = document.createElement('main');
      document.body.appendChild(main);
    }

    const wrapper = document.createElement('div');
    wrapper.id = 'wrap';
    main.appendChild(wrapper);

    ButtonResolver.stopToStartCheck();
    // h2
    new Heading('How to play?', 'wrap').init();

    //    game steps
    const gameStepsSection = document.createElement('section');
    gameStepsSection.classList.add('game-steps');
    wrapper.appendChild(gameStepsSection);

    // 1 step
    const stepOneImg = new ImageDiv('registration-screen', 'img/reg-screen.png', 'registration');
    stepOneImg.init();
    new GameStepDiv('1', 'Register new player in game', stepOneImg.imageDiv).init();

    // 2 step
    const stepTwoImg = new ImageDiv('settings-screen', 'img/settings-screen.png', 'settings');
    stepTwoImg.init();
    new GameStepDiv('2', 'Configure your game settings', stepTwoImg.imageDiv).init();

    // 3 step
    const stepThirdImg = new ImageDiv('game-screen', 'img/game-screen-languages.png', 'game');
    stepThirdImg.init();
    new GameStepDiv('3', 'Start your new game! Remember card positions and match it before times up.', stepThirdImg.imageDiv).init();

    //  If there's no footer - draw footer
    const footerElement = document.getElementById('footer');
    if (!footerElement) {
      this.footer.init();
    }
  }
}
