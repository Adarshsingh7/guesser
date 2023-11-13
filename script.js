const imageList = ['amazon.png', 'coca-cola-logo.png', 'facebook-logo.png', 'mcdonalds-logo.png', 'nike-logo.png', 'samsung-logo.png', 'toyota-logo.png', 'walt-disney-logo.png', 'oracle-logo.png', 'amazon.png', 'google-logo.png', 'coca-cola-logo.png', 'facebook-logo.png', 'google-logo.png', 'mcdonalds-logo.png', 'nike-logo.png', 'samsung-logo.png', 'toyota-logo.png', 'walt-disney-logo.png', 'oracle-logo.png'];
console.log(imageList.length);

const guessBtn = document.querySelectorAll('.guess-btn img');
const score = document.querySelector('.score-board h2');
const reloBtn = document.querySelector('.score-board button');
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
shuffle(imageList);

const game = {
  chance: 0,
  fi: null,
  sec: null,
  score: 0,

  increaseScore: function () {
    this.score += 30;
    score.textContent = `SCORE: ${this.score}`;
  },
  decreaseScore: function () {
    this.score -= (this.score > 0) ? 5 : 0;
    score.textContent = `SCORE: ${this.score}`;
  }
};
console.log(score);

const eventControl = function (event) {
  const btnImg = event.target;
  if (!btnImg.src.includes('question-mark.png')) {
    console.log('fuck');
    return;
  }
  if (game.fi != null && game.sec != null && game.fi.src != game.sec.src) {
    game.fi.src = 'question-mark.png';
    game.sec.src = 'question-mark.png';
    game.fi = null;
    game.sec = null;
  }
  if (game.fi == null) {
    game.fi = btnImg;
    game.fi.src = game.fi.dataset.src;
    return;
  }
  if (game.sec == null) {
    game.sec = btnImg;
    game.sec.src = game.sec.dataset.src;
    if (game.fi.src == game.sec.src) {
      game.chance++;
      if (game.chance == 10) {
        document.querySelector('.container').classList.add('grey');
        document.querySelector('.container h1').textContent = 'YOU WON!!';
      }


      game.increaseScore();
      game.fi = game.sec = null;
    }
    else game.decreaseScore();
    console.log(game.score);
    return;
  }
};

guessBtn.forEach((btn, i) => {
  btn.dataset.src = imageList[i];
  btn.addEventListener('click', eventControl);
});

reloBtn.addEventListener('click', function (e) {
  game.fi = game.sec = null;
  game.score = 0;
  score.textContent = `SCORE: 0`;
  document.querySelector('.container').classList.remove('grey');
  document.querySelector('.container h1').textContent = 'GUESS GAME';
  shuffle(imageList);
  guessBtn.forEach(btn => {
    btn.src = 'question-mark.png';
  });
});

console.log(imageList);
