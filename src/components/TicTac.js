import React, { useState } from 'react';


export default function TicTac() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    if (squares[i] || winner) {
      return;
    }

    const newSquares = squares.slice();
    if (xIsNext) {
        newSquares[i] = 'X';
      } else {
        newSquares[i] = 'O';
      }
      
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const gameWinner = calculateWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const renderSquare = (i) => {
    return (
      <div className="cell" onClick={() => handleClick(i)}>
        {squares[i]}
      </div>
    );
  };

  const calculateWinner = (squares) => {
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
        return squares[a];
      }
    }

    return null;
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <>
      <div className="container">
        <div className="container">
          <h1>Tic Tac Toe</h1>
          <div className="board">
            {Array(9).fill(null).map((_, i) => renderSquare(i))}
          </div>
          <p id="winner">{getStatus()}</p>
          <button className="btn btn-primary" id="reset" onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}