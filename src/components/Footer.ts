import IComponent from '../models/IComponent';
import GitHub from '../shared/GitHub';
import RSS from '../shared/RSS';

export default class Footer implements IComponent {
  private gitHubLink = 'https://github.com/Olga2157';

  private rssLink = 'https://rs.school/js/';

  public init(): void {
    const footer = document.createElement('footer');
    footer.id = 'footer';

    const footerContainer = document.createElement('div');
    footerContainer.classList.add('footer-container');
    footer.appendChild(footerContainer);

    document.body.appendChild(footer);

    new GitHub(this.gitHubLink).init();
    new RSS(this.rssLink).init();
  }
}
