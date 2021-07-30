export default class ButtonResolver {
  public static readonly invisibleClass = 'invisible';

  public static stopToStartCheck(): void {
    const stopBtn = document.querySelector('.stop-button') as HTMLButtonElement;
    if (stopBtn?.clientWidth !== 0) {
      stopBtn.classList.add(ButtonResolver.invisibleClass);
      const startBtn = document.querySelector(
        '.start-button',
      ) as HTMLButtonElement;
      startBtn.classList.remove(ButtonResolver.invisibleClass);
    }
  }
}
