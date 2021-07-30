import IComponent from '../models/IComponent';

export default class GitHub implements IComponent {
  constructor(
    public gitHubLink: string,
  ) {
  }

  public init(): void {
    const github = document.createElement('a');
    github.classList.add('github');
    github.href = this.gitHubLink;
    github.target = '_blank';
    github.rel = 'noopener noreferrer';
    const githubText = document.createTextNode('github');
    github.appendChild(githubText);

    const footerContainer = document.getElementsByClassName('footer-container');
    footerContainer[0]?.appendChild(github);
  }
}
