import { createContext, useState, useEffect } from "react";

const DEFAULT_WORD_LENGTH = 5;
const DEFAULT_NUM_OF_GUESSES = 6;

const GameLogicContext = createContext({
  board: [],
  attmpets: [],
  match: {},
  currLocation: { row: 0, col: 0 },
  wordLength: DEFAULT_WORD_LENGTH,
  numOfGuesses: DEFAULT_NUM_OF_GUESSES,
  word: "",
  gameOver: false,
  win: false,
  resetGame: () => {},
  setGameOver: () => {},
  addChar: (char) => {},
  deleteChar: () => {},
  checkRow: () => {},
  endGame: () => {},
  startGame: (boardWidth, boardLength) => {},
});

export function GameLogicContextProvider(props) {
  let [board, setBoard] = useState([]);
  let [attmpets, setAttempts] = useState([]);
  let [currLocation, setCurrLocation] = useState({ row: 0, col: 0 });
  let [word, setWord] = useState("");
  let [wordLength, setWordLength] = useState(DEFAULT_WORD_LENGTH);
  let [numOfGuesses, setNumOfGuesses] = useState(DEFAULT_NUM_OF_GUESSES);
  let [validWord, setValidWord] = useState(false);
  let [gameOver, setGameOver] = useState(false);
  let [win, setWin] = useState(false);

  const match = { WRONG: 0, CORRECT: 1, WRONG_SPOT: 2 };

  useEffect(() => {
    if(!gameOver){
      initializeBoard();
      getWord();
    }
  }, [wordLength, numOfGuesses, gameOver]);

  useEffect(() => {
    if (validWord) {
      scoreWord();
      setValidWord(false);
    }
  }, [validWord]);

  useEffect(() => {
    if (win) endGame();
  }, [win]);
  
  function startGame(boardWidth, boardLength) {
    setWordLength(boardWidth);
    setNumOfGuesses(boardLength);
  }

  function initializeBoard() {
    let tempBoard = new Array(numOfGuesses);
    let tempAttempts = new Array(numOfGuesses);

    for (let i = 0; i < numOfGuesses; i++) {
      tempBoard[i] = new Array(wordLength);
      tempAttempts[i] = new Array(wordLength);
    }

    setBoard(tempBoard);
    setAttempts(tempAttempts);
  }

  async function getWord() {
    let url = "http://localhost:8000/word/?length=" + wordLength;
    await fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setWord(json.toUpperCase());
      })
      .catch((err) => console.log(err));
  }

  function addChar(char) {
    if (!validChar(char)) return;

    if (currLocation.col < wordLength) {
      let boardCopy = [...board];
      boardCopy[currLocation.row][currLocation.col] = char.toUpperCase();
      setBoard(boardCopy);

      nextCell();
    }
  }

  function validChar(char) {
    return char.length === 1 && char.toLowerCase() !== char.toUpperCase();
  }

  function nextCell() {
    if (currLocation.col < wordLength)
      setCurrLocation({ row: currLocation.row, col: currLocation.col + 1 });
  }

  function nextRow() {
    if (currLocation.col === wordLength)
      setCurrLocation({ row: currLocation.row + 1, col: 0 });
  }

  function deleteChar() {
    if (currLocation.col > 0) {
      let boardCopy = [...board];
      boardCopy[currLocation.row][currLocation.col - 1] = "";
      currLocation.col = currLocation.col - 1;

      setBoard(boardCopy);
    }
  }

  function checkRow() {
    if (currLocation.col < wordLength) return;
    setValidWord(false);
    let guess = board[currLocation.row].join("");
    checkValidWord(guess);
  }

  function scoreWord() {
    let guess = board[currLocation.row].join("");

    // make a copy of the word to check row against
    let checkLetters = new Array(wordLength);
    for (let i = 0; i < word.length; i++) {
      checkLetters[i] = word[i];
    }

    let attmpesCopy = [...attmpets];

    // first iteration only check exact matches
    for (let i = 0; i < wordLength; i++) {
      if (board[currLocation.row][i] === checkLetters[i]) {
        attmpesCopy[currLocation.row][i] = match.CORRECT;
        checkLetters[i] = null;
      }
    }

    for (let i = 0; i < wordLength; i++) {
      if (attmpesCopy[currLocation.row][i]) continue;

      attmpesCopy[currLocation.row][i] = match.WRONG;

      for (let j = 0; j < wordLength; j++) {
        if (board[currLocation.row][i] === checkLetters[j]) {
          attmpesCopy[currLocation.row][i] = match.WRONG_SPOT;
          checkLetters[j] = null;
          break;
        }
      }
    }

    setAttempts(attmpesCopy);
    if (guess === word) setWin(true);
    if (currLocation.row + 1 === numOfGuesses || win) endGame();
    nextRow();
  }

  async function checkValidWord(guess) {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + guess;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.title == "No Definitions Found") setValidWord(false);
        else setValidWord(true);
      })
      .catch((err) => console.log(err));
  }

  function endGame() {
    setGameOver(true);
  }

  function resetGame(){
    setBoard([])
    setAttempts([])
    setCurrLocation({ row: 0, col: 0 });
    setWord("")
    setWin(false)
  }

  return (
    <GameLogicContext.Provider
      value={{
        board: board,
        attmpets: attmpets,
        match: match,
        currLocation: currLocation,
        wordLength: wordLength,
        numOfGuesses: numOfGuesses,
        word: word,
        gameOver: gameOver,
        win: win,
        resetGame: resetGame,
        setGameOver: setGameOver,
        addChar: addChar,
        deleteChar: deleteChar,
        checkRow: checkRow,
        endGame: endGame,
        startGame: startGame,
      }}
    >
      {props.children}
    </GameLogicContext.Provider>
  );
}

export default GameLogicContext;
