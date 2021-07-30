import UserIndexedDB from '../db/UserIndexedDB';
import HashCodeService from '../services/HashCodeService';
import { User } from '../models/types/User';
import IComponent from '../models/IComponent';
import Avatar from '../shared/Avatar';
import Heading from '../shared/Heading';
import RegInputDiv from '../shared/RegInput';
import Config from '../Config';

export default class RegistrationForm implements IComponent {
  private readonly registrationPopup: HTMLElement;

  private static base64Str = 'data:image/jpeg;base64,';

  private static readonly invisibleClass = 'invisible';

  constructor() {
    this.registrationPopup = document.createElement('div');
  }

  public init(): void {
    // delete regpopup, if it exists
    const existedRegPopup = document.querySelector('.popup-container');
    if (existedRegPopup !== null) {
      return;
    }
    this.registrationPopup.classList.add('popup-container');
    this.registrationPopup.setAttribute('z-index', '2');

    const form = document.createElement('form');
    form.classList.add('form');
    form.id = 'form';

    this.registrationPopup.appendChild(form);

    const wrapper = document.getElementById('wrap');
    wrapper?.appendChild(this.registrationPopup);

    new Heading(Config.REGISTER_TEXT, 'form').init();

    new RegInputDiv('First Name', 'Enter First Name', 'username', 'text').init();

    new RegInputDiv('Last Name', 'Enter Last Name', 'user-surname', 'text').init();

    new RegInputDiv('E-mail', 'Enter e-mail', 'email', 'text').init();

    const emailRegInputDiv = new RegInputDiv('Choose your profile image', '', 'profile', 'file');
    emailRegInputDiv.init();
    emailRegInputDiv.regInputDiv.children[1].setAttribute('accept', '.png,.jpg,.jpeg');

    const twoParts = document.createElement('div');
    twoParts.classList.add('two-parts');
    form.appendChild(twoParts);

    const addUser = document.createElement('button');
    const textUser = document.createTextNode('ADD USER');
    addUser.appendChild(textUser);

    addUser.addEventListener('click', RegistrationForm.addNewUser.bind(this));

    twoParts.appendChild(addUser);

    const cancel = document.createElement('button');
    const textCancel = document.createTextNode('CANCEL');
    cancel.appendChild(textCancel);

    cancel.addEventListener('click', (evt: Event) => {
      if (evt.target !== null) {
        document.querySelector('.popup-container')?.remove();
      }
    });

    twoParts.appendChild(cancel);

    const formInputs = document.querySelectorAll('.popup-container input');
    Array.from(formInputs).forEach((input) => {
      input.addEventListener(
        'change',
        RegistrationForm.checkCurInput.bind(this),
      );
    });
  }

  private static checkCurInput(evt: Event) {
    const curInput = evt.target as HTMLInputElement;
    if (!RegistrationForm.checkRequired([curInput])) {
      return;
    }
    if (curInput.id === 'email') {
      RegistrationForm.checkEmail(curInput);
    } else if (curInput.id !== 'profile') {
      RegistrationForm.checkName(curInput);
    }
  }

  private static checkInputs(): boolean {
    const userName = document.getElementById('username') as HTMLInputElement;
    const userSurname = document.getElementById(
      'user-surname',
    ) as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const userAvatar = document.getElementById('profile') as HTMLInputElement;

    let passedChecks = true;
    if (
      !RegistrationForm.checkRequired([
        userName,
        userSurname,
        email,
        userAvatar,
      ])
    ) {
      passedChecks = false;
    }
    if (!RegistrationForm.checkEmail(email)) {
      passedChecks = false;
    }
    if (!RegistrationForm.checkName(userName)) {
      passedChecks = false;
    }
    if (!RegistrationForm.checkName(userSurname)) {
      passedChecks = false;
    }
    return passedChecks;
  }

  private static addNewUser(evt: Event) {
    evt.preventDefault();
    // check errors at res (checkinputs = true)
    if (RegistrationForm.checkInputs()) {
      const userName = document.getElementById('username') as HTMLInputElement;
      const userSurname = document.getElementById(
        'user-surname',
      ) as HTMLInputElement;
      const email = document.getElementById('email') as HTMLInputElement;
      const userHash = HashCodeService.hashcode(
        userName.value,
        userSurname.value,
        email.value,
      );
      const picture = document.getElementById('profile') as HTMLInputElement;
      const reader = new FileReader();
      if (picture !== null && picture.files !== null) {
        reader.readAsBinaryString(picture.files[0]);
      }
      reader.onload = (

        e: ProgressEvent<FileReader>,
      ) => {
        if (e.target != null) {
          const bits = e.target.result as string;
          const user: User = {
            firstName: userName.value,
            lastName: userSurname.value,
            email: email.value,
            hash: userHash,
            picture: bits,
          };
          UserIndexedDB.putUser(user).then(() => {
            sessionStorage.setItem('currentUserHash', String(userHash));

            const userArea = document.querySelector('.user-area');

            const registerButton = document.getElementById('registrId');
            if (registerButton?.style) {
              registerButton.classList.add(RegistrationForm.invisibleClass);
            }
            const startButton = document.getElementById('startGame');
            if (startButton?.style) {
              startButton.classList.remove(RegistrationForm.invisibleClass);
            }
            // btoa generates string in base-64
            const avatar = new Avatar(RegistrationForm.base64Str, btoa(user.picture));
            avatar.init();

            userArea?.appendChild(avatar.avatarDiv);

            document.querySelector('.popup-container')?.remove();
          });
        }
      };
    }
  }

  private static checkRequired(inputs: HTMLInputElement[]): boolean {
    let res = true;
    inputs.forEach((input) => {
      if (input?.value.trim() === '') {
        RegistrationForm.showError(input, 'field is required');
        res = false;
      } else {
        const formControl = input.parentElement as HTMLElement;
        const small = formControl.querySelector('small') as HTMLElement;

        if (small !== null) {
          small.remove();
        }
        formControl.classList.remove('error');
      }
    });
    return res;
  }

  private static checkName(nameInput: HTMLInputElement): boolean {
    const regExpNumbers = /^[0-9]{1,30}/;
    const regExpName = /^([^~!@#$%*()_—+=|:;"'`<>,.?/^]{1,30})$/;
    if (!regExpName.test(nameInput.value) || regExpNumbers.test(nameInput.value)) {
      RegistrationForm.showError(nameInput, 'name is not valid');
      return false;
    }
    RegistrationForm.showSuccess(nameInput);
    return true;
  }

  private static checkEmail(eMailInput: HTMLInputElement): boolean {
    //   cheking according standart RFC 5322
    const regExpEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!regExpEmail.test(eMailInput.value) || (eMailInput.value.length > 30)) {
      RegistrationForm.showError(eMailInput, 'e-mail is not valid. Try again according RFC');
      return false;
    }
    RegistrationForm.showSuccess(eMailInput);
    return true;
  }

  private static showError(input: HTMLInputElement, message: string): void {
    const formControl = input.parentElement as HTMLElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small') as HTMLElement;
    if (small !== null) {
      small.remove();
    }
    const error = document.createElement('small');
    const errorText = document.createTextNode(message);
    error.appendChild(errorText);
    input.parentElement?.appendChild(error);
  }

  private static showSuccess(input: HTMLInputElement): void {
    const formControl = input.parentElement as HTMLElement;
    formControl.className = 'form-control success';
  }
}
