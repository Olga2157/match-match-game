import Card from '../models/classes/Card';
import GameHistory from '../models/classes/GameHistory';
import Config from '../Config';
import SettingDifficulty from '../models/enums/SettingDifficulty';
import { CardStatus } from '../models/enums/CardStatus';
import { GameStatus } from '../models/enums/GameStatus';
import ImageDiv from '../shared/ImageDiv';

export default class GameBoard {
  // array of cards
  private readonly cards: Card[];

  private readonly difficulty;

  private readonly gameType: string;

  private countCards: number;

  private uniqueCardsCount: number;

  private readonly gameHistory: GameHistory;

  constructor() {
    this.cards = [];
    this.difficulty = sessionStorage.getItem(Config.DIFFICULTY) as string;
    this.gameType = sessionStorage.getItem(Config.GAME_TYPE) as string;
    this.countCards = 0;
    this.uniqueCardsCount = 0;
    this.gameHistory = new GameHistory();
  }

  public init(): void {
    const imgPath = Config.IMG_MAP[this.gameType];
    this.countCards = Config.COUNT_MAP[this.difficulty];
    this.uniqueCardsCount = this.countCards / 2;
    let counter = 1;
    for (let i = 0; i < this.countCards; i += 1) {
      this.cards.push(new Card(`img/${imgPath}/${counter}.png`));
      if (counter === this.uniqueCardsCount) {
        counter = 1;
      } else {
        counter += 1;
      }
    }
    GameBoard.shuffle(this.cards);

    const game = document.createElement('div');
    if (this.difficulty === SettingDifficulty[SettingDifficulty.HARD]) {
      game.classList.add('game-hard');
    } else {
      game.classList.add('game');
    }

    const wrap = document.getElementById('wrap');
    wrap?.appendChild(game);

    let cardDifficultyClass = 'cards-easy';
    if (this.difficulty === SettingDifficulty[SettingDifficulty.MEDIUM]) {
      cardDifficultyClass = 'cards-medium';
    } else if (this.difficulty === SettingDifficulty[SettingDifficulty.HARD]) {
      cardDifficultyClass = 'cards-hard';
    }
    for (let i = 0; i < this.cards.length; i += 1) {
      const cardImgDiv = new ImageDiv(cardDifficultyClass, this.cards[i].image, '');
      cardImgDiv.init();

      const curCardDiv = cardImgDiv.imageDiv;
      const cardIdClass = `cards-${i}`;
      curCardDiv.children[0].classList.add(cardIdClass);
      game?.appendChild(curCardDiv);
    }
  }

  public closeAllCards(): void {
    this.cards.forEach((card) => {
      card.closCard();
    });
    const cardElements = document.querySelectorAll(
      '.game div img,.game-hard div img',
    );
    cardElements.forEach((card) => {
      card.classList.add('animation');
      setTimeout(() => {
        card.classList.remove('animation');
      }, 500);
      card.setAttribute('src', Config.CLOSED_CARD_PATH);
      //  function on img
      card.parentElement?.addEventListener(
        'click',
        this.handleCardClick.bind(this),
      );
    });
  }

  // random shuffle
  private static shuffle(array: Card[]) {
    // Math.random() - by default from 0 to 1
    array.sort(() => Math.random() - 0.5);
  }

  private handleCardClick(evt: Event) {
    const image = evt.target as Element;
    if (image.classList !== null) {
      const indexImg = Number(image.classList[0].slice('cards-'.length));
      const curCard = this.cards[indexImg];
      if (curCard.status === CardStatus[CardStatus.Close]) {
        image.classList.add('animation');
        setTimeout(() => {
          image.classList.remove('animation');
        }, 500);
        // index of opened card
        const curOpenIndexCard = this.getCurrentOpenCardIndex();
        // case when there is no opened card before
        if (curOpenIndexCard === -1) {
          // меняется статус на open и меняем картинку с рубашки на изображение
          curCard.status = CardStatus[CardStatus.Open];
          image.removeAttribute('src');
          image.setAttribute('src', curCard.image);
        } else {
          // извлекаем ранее открытую карту
          const alreadyOpenedCard = this.cards[curOpenIndexCard];
          // сравнение картинки ранее открытой карты и текущей карты
          // если совпали: меняем картинку с рубашки на изображение, красим в зеленый

          if (alreadyOpenedCard.image === curCard.image) {
            curCard.status = CardStatus[CardStatus.OpenCorrectly];
            image.removeAttribute('src');
            image.setAttribute('src', curCard.image);
            image.classList.add('card-open-correctly');
            alreadyOpenedCard.status = CardStatus[CardStatus.OpenCorrectly];
            const alreadyOpenedImage = document.querySelector(
              `.cards-${curOpenIndexCard}`,
            );
            alreadyOpenedImage?.classList.add('card-open-correctly');
            // increment successAttempts
            this.gameHistory.successAttempts += 1;
            // обновление статуса игры на finised, когда все карточки открыты -
            // т.е. число успешных открытий = числу уникальных карт
            if (this.gameHistory.successAttempts === this.uniqueCardsCount) {
              this.gameHistory.status = GameStatus.FINISHED;
            }
          } else {
            // если картинки не совпали - красим в красный -
            // закрываем через 1 сек и убираем присвоенный класс
            curCard.status = CardStatus[CardStatus.OpenIncorrectly];
            image.removeAttribute('src');
            image.setAttribute('src', curCard.image);
            image.classList.add('card-open-incorrectly');
            alreadyOpenedCard.status = CardStatus[CardStatus.OpenIncorrectly];
            const alreadyOpenedImage = document.querySelector(
              `.cards-${curOpenIndexCard}`,
            );
            alreadyOpenedImage?.classList.add('card-open-incorrectly');
            // закрываем через 1 сек и убираем присвоенный класс
            setTimeout(() => {
              image.removeAttribute('src');
              image.setAttribute('src', Config.CLOSED_CARD_PATH);
              image.classList.remove('card-open-incorrectly');
              alreadyOpenedImage?.removeAttribute('src');
              alreadyOpenedImage?.setAttribute('src', Config.CLOSED_CARD_PATH);
              alreadyOpenedImage?.classList.remove('card-open-incorrectly');
              // обновляем статусы (иначе при повторных нажатиях картинки
              // будут показывать рубашки)
              curCard.status = CardStatus[CardStatus.Close];
              alreadyOpenedCard.status = CardStatus[CardStatus.Close];
            }, 1000);
            // increment failedAttempts
            this.gameHistory.failedAttempts += 1;
          }
        }
      }
    }
  }

  private getCurrentOpenCardIndex(): number {
    for (let i = 0; i < this.cards.length; i += 1) {
      if (this.cards[i].status === CardStatus[CardStatus.Open]) {
        return i;
      }
    }
    return -1;
  }

  public isFishished(): boolean {
    if (this.gameHistory.status === GameStatus.FINISHED) {
      return true;
    }
    return false;
  }

  public get history(): GameHistory {
    return this.gameHistory;
  }
}
