import { GameStatus } from '../enums/GameStatus';

export default class GameHistory {
  public status: GameStatus;

  public failedAttempts: number;

  public successAttempts: number;

  constructor() {
    this.status = GameStatus.IN_PROGRESS;
    this.failedAttempts = 0;
    this.successAttempts = 0;
  }
}
