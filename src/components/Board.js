import React, { useState } from 'react';
import Square from './Square';
import happyGif from './img/happy.gif';

function Board() {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const gameResult = calculateWinner(newSquares);
    if (gameResult) {
      setWinner(gameResult.winner);
      setWinningSquares(gameResult.line);
    }
  };

  const handleReset = () => {
    setSquares(initialSquares);
    setIsXNext(true);
    setWinner(null);
    setWinningSquares([]);
  };

  const renderSquare = (index) => {
    return (
      <Square
        value={squares[index]}
        onClick={() => handleClick(index)}
        highlight={winningSquares.includes(index)}
      />
    );
  };

  const isDraw = squares.every((square) => square !== null) && !winner;
  const isStart = squares.every((square) => square === null);
  const status = winner
    ? `Congratulation!: ${winner}`
    : isDraw
    ? 'Draw'
    : isStart
    ? 'Start The Game'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="container">
      <h1>Tic Tac Toe Game</h1>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {(winner || isDraw) && (
        <div className="congratulations">
          {winner && <img src={happyGif} alt="Congratulations GIF" />}
          <button className="reset-button" onClick={handleReset}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

export default Board;