import BestScorePage from '../components/BestScorePage';
import GameSettingsPage from '../components/GameSettingsPage';
import AboutGamePage from '../components/AboutGamePage';
import GamePage from '../components/GamePage';
import { ActivePages } from '../models/enums/ActivePages';

export default class Routing {
  public static goToPage(page: ActivePages): void {
    let newPage;
    switch (page) {
      case ActivePages.AboutGamePage:
        newPage = new AboutGamePage();
        break;
      case ActivePages.BestScorePage:
        newPage = new BestScorePage();
        break;
      case ActivePages.GameSettingsPage:
        newPage = new GameSettingsPage();
        break;
      case ActivePages.GamePage:
        newPage = new GamePage();
        break;
      default:
        newPage = new AboutGamePage();
    }
    if (document.getElementById('wrap')) {
      document.getElementById('wrap')?.remove();
    }
    Routing.switchActiveRoute(page);
    newPage?.init();
  }

  private static switchActiveRoute(page: ActivePages): void {
    const curActiveRoute = document.querySelector('.active-route');
    if (curActiveRoute) {
      curActiveRoute.classList.remove('active-route');
    }
    const navButtons = document.querySelectorAll('.navigation-buttons button');
    switch (page) {
      case ActivePages.AboutGamePage:
        navButtons[0].classList.add('active-route');
        break;
      case ActivePages.BestScorePage:
        navButtons[1].classList.add('active-route');
        break;
      case ActivePages.GameSettingsPage:
        navButtons[2].classList.add('active-route');
        break;
      default:
    }
  }
}
