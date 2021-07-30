import IComponent from '../models/IComponent';

export default class GameTimer implements IComponent {
  private separator = ':';

  private minutes = 'minutes';

  private seconds = 'seconds';

  private startMinute = '00';

  private startSeconds = '30';

  public init(): void {
    const wrapper = document.getElementById('wrap');
    const timerDiv = document.createElement('div');
    timerDiv.classList.add('timer');

    const minutesLabel = document.createElement('label');
    minutesLabel.id = this.minutes;
    const textMinutesLabel = document.createTextNode(this.startMinute);
    minutesLabel.appendChild(textMinutesLabel);
    const separator = document.createTextNode(this.separator);
    const secondsLabel = document.createElement('label');
    const textSecondsLabel = document.createTextNode(this.startSeconds);
    secondsLabel.id = this.seconds;
    secondsLabel.appendChild(textSecondsLabel);

    timerDiv.appendChild(minutesLabel);
    timerDiv.appendChild(separator);
    timerDiv.appendChild(secondsLabel);

    wrapper?.appendChild(timerDiv);
  }

  public decrementTime(seconds : number) {
    const secondsLabel = document.getElementById(this.seconds);
    if (secondsLabel !== null) {
      secondsLabel.textContent = String(seconds).padStart(2, '0');
    }
  }

  public incrementTime(seconds : number) {
    const minutesLabel = document.getElementById(this.minutes);
    const secondsLabel = document.getElementById(this.seconds);
    if (minutesLabel !== null) {
      const currentMinute = Math.floor(seconds / 60);
      minutesLabel.textContent = String(currentMinute).padStart(2, '0');
    }
    if (secondsLabel !== null) {
      const currentSecond = Number(seconds % 60);
      secondsLabel.textContent = String(currentSecond).padStart(2, '0');
    }
  }
}
