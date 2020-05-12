const guessHandler = (wordid, guess, wordlist) => {
  // verify the word's id by matching it to the word we want to target
  let word = wordlist.find((word) => word.id === wordid);
  // We want to return a list of booleans representing whether each position in the word is the guess letter or not.
  let bools = [];
  // slightly odd syntax here: the first use of the word 'word' represents the object, and the second one represents the word itself. It's actually perfectly straightforward!
  word.word.split('').forEach((letter) => {
    bools.push(letter === guess.toLowerCase());
  });
  return { bools: bools };
};

module.exports = { guessHandler };
