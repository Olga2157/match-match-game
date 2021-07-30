import GameBoard from '../services/GameBoard';
import GameHistory from '../models/classes/GameHistory';
import ScoreIndexedDB from '../db/ScoreIndexedDB';
import { Score } from '../models/types/Score';
import IComponent from '../models/IComponent';
import CongratulatePopup from './CongratulatePopup';
import GameTimer from './GameTimer';

export default class GamePage implements IComponent {
  private totalSeconds;

  private interval;

  private gameTimer;

  private gameBoard;

  private readonly totalSecondsDefault = 30;

  private readonly defaultTimerTime = 1000;

  private readonly invisibleClass = 'invisible';

  private readonly calculationConstOne = 100;

  private readonly calculationConstTwo = 10;

  constructor() {
    this.totalSeconds = this.totalSecondsDefault;
    this.gameTimer = new GameTimer();
    this.interval = setInterval(this.decrementTime.bind(this), this.defaultTimerTime);
    this.gameBoard = new GameBoard();
  }

  public init(): void {
    const stopGame = document.getElementById('stopGame');
    const startGame = document.getElementById('startGame');
    if (stopGame?.style) {
      stopGame.classList.remove(this.invisibleClass);
    }

    if (startGame?.style) {
      startGame.classList.add(this.invisibleClass);
    }

    stopGame?.addEventListener('click', this.stopTimer.bind(this));

    const main = document.getElementsByTagName('main')[0];
    const wrapper = document.createElement('div');
    wrapper.id = 'wrap';

    main.appendChild(wrapper);
    this.gameTimer.init();
    this.gameBoard.init();

    const navigationButtons = document.querySelectorAll(
      '.navigation-buttons button',
    );
    navigationButtons.forEach((button) => {
      button.addEventListener('click', this.stopTimer.bind(this));
    });
  }

  private decrementTime() {
    this.totalSeconds -= 1;
    this.gameTimer.decrementTime(this.totalSeconds);
    if (this.totalSeconds === 0) {
      clearInterval(this.interval);
      this.gameBoard.closeAllCards();
      this.interval = setInterval(this.incrementTime.bind(this), this.defaultTimerTime);
    }
  }

  private incrementTime() {
    this.totalSeconds += 1;
    this.gameTimer.incrementTime(this.totalSeconds);
    if (this.gameBoard.isFishished()) {
      clearInterval(this.interval);
      //    put score in indexedDB, hash user was used from sessionStorage
      const calcScore = this.calculateScore(this.gameBoard.history);
      const score: Score = {
        hashUser: Number(sessionStorage.getItem('currentUserHash')),
        score: calcScore,
      };
      ScoreIndexedDB.putScore(score);
      const congratulatePopup = new CongratulatePopup(this.totalSeconds);
      congratulatePopup.init();
    }
  }

  private calculateScore(gameHistory: GameHistory) {
    // formula was used from the task.
    const calc = (gameHistory.successAttempts - gameHistory.failedAttempts)
     * this.calculationConstOne - this.totalSeconds * this.calculationConstTwo;
    if (calc < 0) {
      return 0;
    }
    return calc;
  }

  private stopTimer() {
    clearInterval(this.interval);
  }
}
