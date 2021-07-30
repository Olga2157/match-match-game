import ButtonResolver from '../models/classes/ButtonResolver';
import ScoreIndexedDB from '../db/ScoreIndexedDB';
import { ScoreDetails } from '../models/types/ScoreDetails';
import { Score } from '../models/types/Score';
import { User } from '../models/types/User';
import UserIndexedDB from '../db/UserIndexedDB';
import Avatar from '../shared/Avatar';
import Heading from '../shared/Heading';

export default class BestScorePage {
  private readonly base64Str = 'data:image/jpeg;base64,';

  public init(): void {
    const main = document.getElementsByTagName('main')[0];
    const wrapper = document.createElement('div');
    wrapper.id = 'wrap';
    main.appendChild(wrapper);
    // h2
    new Heading('Best players', 'wrap').init();
    //    best score
    const bestScoreDiv = document.createElement('div');
    bestScoreDiv.classList.add('best-score-div');
    wrapper.appendChild(bestScoreDiv);
    ButtonResolver.stopToStartCheck();
    const scoreDetails: ScoreDetails[] = [];
    ScoreIndexedDB.getScores().then((response: Score[]) => {
      const scores = response as Score[];
      // sort all scores from max to min
      scores.sort((s1, s2) => (s1.score > s2.score ? -1 : 1));
      // cut TOP10 scores
      scores.splice(10);
      const promises = Array<Promise<User>>();
      scores.forEach((score: Score) => {
        const userPromise = UserIndexedDB.getUser(
          score.hashUser,
        ) as Promise<User>;
        // promises - array of userPromise (max count: 10)
        promises.push(userPromise);
        userPromise.then((userResponse: User) => {
          if (response) {
            const userDetails = userResponse as User;
            const scoreDetail: ScoreDetails = {
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
              email: userDetails.email,
              score: score.score,
              picture: userDetails.picture,
            };
            scoreDetails.push(scoreDetail);
          }
        });
      });
      Promise.all(promises).then(() => {
        // sort 10 userPromise from max to min after receiving them on the previous step
        scoreDetails.sort((sd1, sd2) => sd2.score - sd1.score);
        scoreDetails.forEach((scoreDetail) => {
          // draw all top users
          const userDiv = document.createElement('div');
          userDiv.classList.add('user-div');

          // btoa - создает строку, закодированную в base-64 из строки бинарных
          const avatar = new Avatar(this.base64Str, btoa(scoreDetail.picture));
          avatar.init();

          userDiv.appendChild(avatar.avatarDiv);

          const user = document.createElement('p');
          user.classList.add('score-name');
          user.textContent = `${scoreDetail.firstName} ${scoreDetail.lastName}`;
          userDiv.appendChild(user);

          const userContact = document.createElement('p');
          userContact.classList.add('user-email');
          userContact.textContent = `e-mail: ${scoreDetail.email}`;
          userDiv.appendChild(userContact);

          const userScore = document.createElement('p');
          userScore.classList.add('user-score');
          userScore.textContent = `Score: ${scoreDetail.score}`;
          userDiv.appendChild(userScore);

          bestScoreDiv.appendChild(userDiv);
        });
      });
    });
  }
}
