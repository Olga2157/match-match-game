import IComponent from '../models/IComponent';

export default class Heading implements IComponent {
  constructor(
    public headingText: string,
    public parentId: string,
  ) {
  }

  public init(): void {
    const heading = document.createElement('h2');

    const headingText = document.createTextNode(this.headingText);
    heading.appendChild(headingText);

    const parent = document.getElementById(this.parentId);
    parent?.appendChild(heading);
  }
}
