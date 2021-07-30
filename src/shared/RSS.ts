import IComponent from '../models/IComponent';

export default class RSS implements IComponent {
  constructor(
    public rssLink: string,
  ) {
  }

  public init(): void {
    const rss = document.createElement('a');
    rss.classList.add('rss');
    rss.href = this.rssLink;
    rss.target = '_blank';
    rss.rel = 'noopener noreferrer';
    const rssYear = document.createElement('span');
    const rssYearText = document.createTextNode("'21");
    rssYear.appendChild(rssYearText);
    rssYear.classList.add('rss-year');
    rss.appendChild(rssYear);

    const footerContainer = document.getElementsByClassName('footer-container');
    footerContainer[0]?.appendChild(rss);
  }
}
