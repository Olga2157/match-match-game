## Match-match-game

![Game App](https://github.com/Olga2157/match-match-game/blob/main/src/img/screenshot-game.png "Match-match-game app")

### Description

The task was to implement the match-match game. The game is often used to train the memory. The playing field consists of cards with different patterns on the back. Before the start of the game session, the player sees all cards, after 30 seconds they will be hidden. The victory is counted when all pairs of cards are found.

### Functional options

1. General:
   * SPA
2. UI:
   * There are three pages in the app. The are the Settings page, the About Game page, the Best score page.
   * About game describes how to play.
   * Settings page offers to change the difficulty and the type of cards.
   * Game page consists of the cards and the timer.
   * Congratulation appears after the win.
   * Best score page shows top 10 players with theirs avatars, names, contacts and scores.
3. Registration form:
   * Checking name, surname.
   * E-mail must follow the standard email generation rule *[RFC].*
   * The correct and incorrect fields are highlighted.
   * Start button appears in the case of correct fields in registration form.
4.   User's avatar:
   * Players can load the avatar. 
   * Avatars are stored in indexedDb in *base64* format.
   * Avatar is displayed in the header and on the best score page.


### Language: 
**TypeScript**

### Technologies, tools
Webpack, IndexedDB, ESLint, Prettier 

### Key skills:

* Registration form
* Saving data in IndexedDB
* Saving images in base64

**More details:** 

[Technical requirements](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/match-match-game.md)
[RFC](https://en.wikipedia.org/wiki/Email_address#Standards_documents)
[Example of design](https://www.figma.com/file/nE1hG7VIpX8mQ0BbPEF29I/Match-match-game?node-id=1%3A1960)

**Demo**: https://rolling-scopes-school.github.io/olga2157-JSFE2021Q1/match-match-game/