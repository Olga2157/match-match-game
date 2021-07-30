import IComponent from '../models/IComponent';

export default class GameStepDiv implements IComponent {
  constructor(
    public stepText: string,
    public stepDescription: string,
    public stepImage: HTMLDivElement,
  ) {
  }

  public init(): void {
    const gameStepDiv = document.createElement('div');
    gameStepDiv.classList.add('game-step');

    const step = document.createElement('h3');
    const stepText = document.createTextNode(this.stepText);
    step.appendChild(stepText);
    gameStepDiv.appendChild(step);

    const descStep = document.createElement('p');
    const descStepText = document.createTextNode(this.stepDescription);
    descStep.appendChild(descStepText);
    gameStepDiv.appendChild(descStep);

    const stepImg = this.stepImage;
    gameStepDiv.appendChild(stepImg);

    const gameStepsSection = document.querySelector('.game-steps');
    gameStepsSection?.appendChild(gameStepDiv);
  }
}
