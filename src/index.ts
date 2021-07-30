import AboutGamePage from './components/AboutGamePage';
import SettingDifficulty from './models/enums/SettingDifficulty';
import Config from './Config';
import NavigationPanel from './components/NavigationPanel';
import SettingCards from './models/enums/SettingCards';

sessionStorage.setItem(
  Config.DIFFICULTY,
  SettingDifficulty[SettingDifficulty.EASY],
);
sessionStorage.setItem(Config.GAME_TYPE, SettingCards[SettingCards.Cities]);

NavigationPanel.init();

const aboutPage = new AboutGamePage();
aboutPage.init();
