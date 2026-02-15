import React, { useState, useEffect, useCallback } from 'react';
import './tetris.css';

// Tetris Game Component
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY_CELL = 0;

// Tetromino shapes
const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]]
};

const SHAPE_COLORS = {
  I: '#00f0f0',
  O: '#f0f000',
  T: '#a000f0',
  S: '#00f000',
  Z: '#f00000',
  J: '#0000f0',
  L: '#f0a000'
};

const createEmptyBoard = () => {
  return Array.from({ length: BOARD_HEIGHT }, () => 
    Array(BOARD_WIDTH).fill(EMPTY_CELL)
  );
};

const randomShape = () => {
  const shapes = Object.keys(SHAPES);
  const randomKey = shapes[Math.floor(Math.random() * shapes.length)];
  return {
    shape: SHAPES[randomKey],
    color: SHAPE_COLORS[randomKey],
    key: randomKey
  };
};

const Tetris = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const spawnPiece = useCallback(() => {
    const piece = randomShape();
    const startX = Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2);
    setCurrentPiece(piece);
    setPosition({ x: startX, y: 0 });
    
    // Check if spawn position is valid
    if (!isValidMove(board, piece.shape, { x: startX, y: 0 })) {
      setGameOver(true);
    }
  }, [board]);

  const isValidMove = (board, shape, newPos) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newX = newPos.x + x;
          const newY = newPos.y + y;
          
          if (
            newX < 0 ||
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && board[newY][newX] !== EMPTY_CELL)
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const mergePieceToBoard = useCallback(() => {
    if (!currentPiece) return;
    
    const newBoard = board.map(row => [...row]);
    const shape = currentPiece.shape;
    
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] && position.y + y >= 0) {
          newBoard[position.y + y][position.x + x] = currentPiece.color;
        }
      }
    }
    
    setBoard(newBoard);
    clearLines(newBoard);
    spawnPiece();
  }, [board, currentPiece, position, spawnPiece]);

  const clearLines = (board) => {
    let linesCleared = 0;
    const newBoard = board.filter(row => {
      if (row.every(cell => cell !== EMPTY_CELL)) {
        linesCleared++;
        return false;
      }
      return true;
    });
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL));
    }
    
    if (linesCleared > 0) {
      setBoard(newBoard);
      setScore(prev => prev + linesCleared * 100);
    }
  };

  const moveDown = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    
    const newPos = { ...position, y: position.y + 1 };
    
    if (isValidMove(board, currentPiece.shape, newPos)) {
      setPosition(newPos);
    } else {
      mergePieceToBoard();
    }
  }, [currentPiece, position, board, gameOver, isPaused, mergePieceToBoard]);

  const moveLeft = () => {
    if (!currentPiece || gameOver || isPaused) return;
    const newPos = { ...position, x: position.x - 1 };
    if (isValidMove(board, currentPiece.shape, newPos)) {
      setPosition(newPos);
    }
  };

  const moveRight = () => {
    if (!currentPiece || gameOver || isPaused) return;
    const newPos = { ...position, x: position.x + 1 };
    if (isValidMove(board, currentPiece.shape, newPos)) {
      setPosition(newPos);
    }
  };

  const rotate = () => {
    if (!currentPiece || gameOver || isPaused) return;
    
    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    );
    
    if (isValidMove(board, rotated, position)) {
      setCurrentPiece({ ...currentPiece, shape: rotated });
    }
  };

  const hardDrop = () => {
    if (!currentPiece || gameOver || isPaused) return;
    
    let newPos = { ...position };
    while (isValidMove(board, currentPiece.shape, { ...newPos, y: newPos.y + 1 })) {
      newPos.y++;
    }
    setPosition(newPos);
    mergePieceToBoard();
  };

  const startGame = () => {
    setBoard(createEmptyBoard());
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
    spawnPiece();
  };

  const togglePause = () => {
    if (!gameOver && gameStarted) {
      setIsPaused(!isPaused);
    }
  };

  useEffect(() => {
    if (!gameStarted || !currentPiece) return;

    const handleKeyPress = (e) => {
      if (gameOver) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotate();
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPiece, position, board, gameOver, isPaused, gameStarted]);

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused || !currentPiece) return;

    const interval = setInterval(() => {
      moveDown();
    }, 1000);

    return () => clearInterval(interval);
  }, [moveDown, gameOver, isPaused, gameStarted, currentPiece]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    if (currentPiece && !gameOver) {
      const shape = currentPiece.shape;
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] && position.y + y >= 0) {
            displayBoard[position.y + y][position.x + x] = currentPiece.color;
          }
        }
      }
    }
    
    return displayBoard;
  };

  return (
    <div className="tetris-container">
      <div className="tetris-game">
        <h1>Tetris Game</h1>
        
        <div className="game-info">
          <div className="score">Score: {score}</div>
          {gameOver && <div className="game-over">Game Over!</div>}
          {isPaused && <div className="paused">Paused</div>}
        </div>

        <div className="tetris-board">
          {renderBoard().map((row, y) => (
            <div key={y} className="row">
              {row.map((cell, x) => (
                <div
                  key={x}
                  className="cell"
                  style={{
                    backgroundColor: cell || '#1a1a1a',
                    border: cell ? '1px solid #333' : '1px solid #333'
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="controls">
          {!gameStarted || gameOver ? (
            <button onClick={startGame} className="btn-start">
              {gameOver ? 'Restart' : 'Start Game'}
            </button>
          ) : (
            <button onClick={togglePause} className="btn-pause">
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
        </div>

        <div className="instructions">
          <h3>Controls:</h3>
          <p>← → : Move</p>
          <p>↑ : Rotate</p>
          <p>↓ : Move Down</p>
          <p>Space : Hard Drop</p>
          <p>P : Pause</p>
        </div>
      </div>
    </div>
  );
};

export default Tetris;
