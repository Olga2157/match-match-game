import { ImgMap } from './models/types/ImgMap';
import { CountMap } from './models/types/CountMap';

export default class Config {
  public static readonly DB_NAME = 'Olga2157';

  public static readonly DB_VERSION = 15;

  public static readonly GAME_TYPE = 'gameType';

  public static readonly DIFFICULTY = 'difficulty';

  public static readonly CLOSED_CARD_PATH = 'img/card.svg';

  public static readonly REGISTER_TEXT = 'REGISTER NEW PLAYER';

  public static IMG_MAP: ImgMap = {
    Animals: 'animals',
    Cities: 'cities',
    Languages: 'it',
  };

  public static COUNT_MAP: CountMap = {
    EASY: 12,
    MEDIUM: 16,
    HARD: 24,
  };
}
