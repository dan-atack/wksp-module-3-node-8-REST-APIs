'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { words } = require('./data/hangwords');
const { guessHandler } = require('./data/guessHandler');

const PORT = process.env.PORT || 8000;

// handlers first:

const handleHangman = (req, res) => {
  res.render('./public/hangman/index', {});
};

const getWords = (req, res) => {
  let word = words[Math.floor(Math.random() * words.length)];
  console.log(word);
  res.send(JSON.stringify({ id: word.id, length: word.letters }));
};

const handleGuess = (req, res) => {
  let wordid = req.params.wordid;
  let guess = req.params.letter;
  // guesshandler returns an array of booleans: one for each index position of the mystery word. Trues represent an instance of the guess letter in the hidden word.
  res.send(JSON.stringify(guessHandler(wordid, guess, words)));
};

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints

  .get('/hangman', handleHangman)
  .get('/hangman/words', getWords)
  .get('/hangman/guess/:wordid/:letter', handleGuess)

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
