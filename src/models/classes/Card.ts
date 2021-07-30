import { CardStatus } from '../enums/CardStatus';

export default class Card {
  public status;

  constructor(public image: string) {
    this.status = CardStatus[CardStatus.Open];
  }

  public closCard(): void {
    this.status = CardStatus[CardStatus.Close];
  }
}
