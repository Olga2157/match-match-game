import ButtonResolver from '../models/classes/ButtonResolver';
import SettingCards from '../models/enums/SettingCards';
import SettingDifficulty from '../models/enums/SettingDifficulty';
import IComponent from '../models/IComponent';
import Heading from '../shared/Heading';

export default class GameSettingsPage implements IComponent {
  private readonly selectGameType = 'select game cards type';

  private readonly selectDifficultyOfGame = 'select difficulty of game';

  public init(): void {
    ButtonResolver.stopToStartCheck();
    const main = document.getElementsByTagName('main')[0];
    const wrapper = document.createElement('div');
    wrapper.id = 'wrap';
    main.appendChild(wrapper);

    // h2
    new Heading('Game Settings', 'wrap').init();

    const settingsDiv = document.createElement('div');
    settingsDiv.classList.add('settings-div');

    const selectGameType = document.createElement('select');
    const selectDifficulty = document.createElement('select');
    const selectOptionCard = document.createElement('option');
    selectOptionCard.setAttribute('selected', 'true');
    selectOptionCard.setAttribute('disabled', 'true');
    selectOptionCard.text = this.selectGameType;
    selectGameType.appendChild(selectOptionCard);
    Object.keys(SettingCards).forEach((card) => {
      if (Number.isNaN(Number(card))) {
        // исключение добавления индексов 0 1 2: если не индекс, то:
        const optionCard = document.createElement('option');
        optionCard.text = card;
        selectGameType.appendChild(optionCard);
      }
    });
    const selectDifficultyOption = document.createElement('option');
    selectDifficultyOption.setAttribute('selected', 'true');
    selectDifficultyOption.setAttribute('disabled', 'true');
    selectDifficultyOption.text = this.selectDifficultyOfGame;
    selectDifficulty.appendChild(selectDifficultyOption);
    Object.keys(SettingDifficulty).forEach((difficulty) => {
      if (Number.isNaN(Number(difficulty))) {
        // except of indexes 0 1 2 (the peculiarity of using select)
        const optionDifficulty = document.createElement('option');
        optionDifficulty.text = difficulty;
        selectDifficulty.appendChild(optionDifficulty);
      }
    });

    settingsDiv?.appendChild(selectGameType);
    settingsDiv?.appendChild(selectDifficulty);
    wrapper?.appendChild(settingsDiv);

    // put in sessionStorage information about choosen card's type  and choseen difficulty
    selectGameType.addEventListener('change', (event: Event) => {
      const selectElem = event.target as HTMLSelectElement;
      sessionStorage.setItem('gameType', selectElem.value);
    });
    selectDifficulty.addEventListener('change', (event: Event) => {
      const selectElem = event.target as HTMLSelectElement;
      sessionStorage.setItem('difficulty', selectElem.value);
    });
  }
}
