// Define Links to HTML elements:

const content = document.querySelector('.content');
const newWordButton = document.getElementById('get-word');
const gallows = document.getElementById('gallows');
const letters = document.getElementById('word-boxes');
const announcement = document.getElementById('announcement');
const used = document.getElementById('letters-used');
// we'll use this variable to retain the id of whichever word gets passed down:
let wordId = 0;
// keep the letters as an array for easier manipulation/updating:
let letterList = [];
// how dead are you? 0 = not at all, 6 = quite dead.
const deadnessIndicators = [
  'head',
  'torso',
  'left arm',
  'right arm',
  'left leg',
  'right leg',
];
let currentDeadness = 0;
// store and show letters that have been attempted:
let lettersUsed = [];

const handleNewWord = (event) => {
  event.preventDefault();
  fetch('/hangman/words')
    .then((res) => {
      return res.json();
    })
    .then((reply) => {
      wordId = reply.id;
      const letterSpots = [];
      for (let i = 1; i <= reply.length; i++) {
        letterSpots.push('_');
      }
      letterList = letterSpots;
      letters.innerText = letterSpots.join('');
      // cleanup in aisle 1:
      newWordButton.removeEventListener('click', handleNewWord);
      // start the game by adding the event listener for the keyboard:
      document.addEventListener('keyup', hangmanScript);
    });
};

const hangmanScript = (ev) => {
  // send letter guess and ID to server for verification:
  fetch(`/hangman/guess/${wordId}/${ev.key}`)
    .then((res) => {
      return res.json();
    })
    .then((reply) => {
      if (reply.bools.includes(true)) {
        reply.bools.forEach((letter, idx) => {
          if (letter) letterList[idx] = ev.key;
        });
        letters.innerText = letterList.join('');
        if (!letterList.includes('_'))
          announcement.innerText = 'You have won. Congratulations.';
      } else {
        currentDeadness += 1;
        gallows.innerText =
          'Body parts asphyxiated: ' +
          deadnessIndicators.slice(0, currentDeadness).join(', ');
      }
    });
  lettersUsed.push(ev.key);
  used.innerText = 'Letters used: ' + lettersUsed.join(', ');

  if (currentDeadness >= 6) {
    announcement.innerText =
      'You have been hanged by the neck until dead. May Gawd have muhcy.';
    document.removeEventListener('keyup', hangmanScript);
  }
};

newWordButton.addEventListener('click', handleNewWord);
