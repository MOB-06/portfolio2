import React, { useState, useEffect, useCallback, useRef } from 'react';
import './tetris.css';

// Tetris game configuration
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY_CELL = 0;

// Scoring system: points awarded for clearing lines
// 1 line = 100, 2 lines = 300, 3 lines = 500, 4 lines = 800
const POINTS_PER_LINES = [0, 100, 300, 500, 800];

// Drop speed configuration
const MIN_DROP_SPEED = 100; // Minimum time between drops (fastest)
const BASE_DROP_SPEED = 1000; // Initial drop speed (slowest)
const SPEED_INCREASE_PER_LEVEL = 100; // Speed increase per level

// Tetromino shapes
const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1]
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1]
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1]
  ]
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

// Create empty board
const createEmptyBoard = () => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL));
};

// Get random tetromino
const getRandomTetromino = () => {
  const shapes = Object.keys(SHAPES);
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  return {
    shape: SHAPES[randomShape],
    color: SHAPE_COLORS[randomShape],
    type: randomShape
  };
};

const Tetris = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  const gameLoopRef = useRef(null);
  const dropSpeedRef = useRef(1000);

  // Initialize first piece
  const initializePiece = useCallback(() => {
    const piece = getRandomTetromino();
    const startX = Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2);
    setCurrentPiece(piece);
    setPosition({ x: startX, y: 0 });
    return { piece, position: { x: startX, y: 0 } };
  }, []);

  // Check collision
  const checkCollision = useCallback((piece, pos, gameBoard) => {
    if (!piece) return false;
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          
          if (
            newX < 0 ||
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && gameBoard[newY][newX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  // Rotate piece
  const rotatePiece = useCallback((piece) => {
    const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map(row => row[i]).reverse()
    );
    return { ...piece, shape: rotated };
  }, []);

  // Merge piece to board
  const mergePiece = useCallback((gameBoard, piece, pos) => {
    const newBoard = gameBoard.map(row => [...row]);
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] && pos.y + y >= 0) {
          newBoard[pos.y + y][pos.x + x] = piece.color;
        }
      }
    }
    return newBoard;
  }, []);

  // Clear completed lines
  const clearLines = useCallback((gameBoard) => {
    let linesCleared = 0;
    const newBoard = gameBoard.filter(row => {
      if (row.every(cell => cell !== EMPTY_CELL)) {
        linesCleared++;
        return false;
      }
      return true;
    });

    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL));
    }

    return { newBoard, linesCleared };
  }, []);

  // Move piece
  const movePiece = useCallback((dx, dy) => {
    if (!currentPiece || gameOver || isPaused || !gameStarted) return false;

    const newPos = { x: position.x + dx, y: position.y + dy };
    
    if (!checkCollision(currentPiece, newPos, board)) {
      setPosition(newPos);
      return true;
    }
    
    return false;
  }, [currentPiece, position, board, gameOver, isPaused, gameStarted, checkCollision]);

  // Drop piece
  const dropPiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused || !gameStarted) return;

    if (!movePiece(0, 1)) {
      // Merge piece to board
      const mergedBoard = mergePiece(board, currentPiece, position);
      
      // Clear lines
      const { newBoard, linesCleared } = clearLines(mergedBoard);
      
      if (linesCleared > 0) {
        const points = POINTS_PER_LINES[linesCleared];
        setScore(prev => prev + points * level);
        setLines(prev => {
          const newLines = prev + linesCleared;
          setLevel(Math.floor(newLines / 10) + 1);
          return newLines;
        });
      }
      
      setBoard(newBoard);
      
      // Create new piece
      const { piece: newPiece, position: newPos } = initializePiece();
      
      // Check game over
      if (checkCollision(newPiece, newPos, newBoard)) {
        setGameOver(true);
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      }
    }
  }, [currentPiece, position, board, gameOver, isPaused, gameStarted, movePiece, mergePiece, clearLines, initializePiece, checkCollision, level]);

  // Rotate current piece
  const handleRotate = useCallback(() => {
    if (!currentPiece || gameOver || isPaused || !gameStarted) return;

    const rotated = rotatePiece(currentPiece);
    
    if (!checkCollision(rotated, position, board)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, position, board, gameOver, isPaused, gameStarted, rotatePiece, checkCollision]);

  // Hard drop
  const hardDrop = useCallback(() => {
    if (!currentPiece || gameOver || isPaused || !gameStarted) return;

    let newY = position.y;
    while (!checkCollision(currentPiece, { x: position.x, y: newY + 1 }, board)) {
      newY++;
    }
    setPosition({ x: position.x, y: newY });
    
    // Force immediate merge
    setTimeout(() => dropPiece(), 50);
  }, [currentPiece, position, board, gameOver, isPaused, gameStarted, checkCollision, dropPiece]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted || gameOver) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          e.preventDefault();
          movePiece(0, 1);
          break;
        case 'ArrowUp':
        case ' ':
          e.preventDefault();
          handleRotate();
          break;
        case 'Enter':
          e.preventDefault();
          hardDrop();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver, movePiece, handleRotate, hardDrop]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    dropSpeedRef.current = Math.max(MIN_DROP_SPEED, BASE_DROP_SPEED - (level - 1) * SPEED_INCREASE_PER_LEVEL);
    
    gameLoopRef.current = setInterval(() => {
      dropPiece();
    }, dropSpeedRef.current);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, isPaused, level, dropPiece]);

  // Start game
  const startGame = () => {
    setBoard(createEmptyBoard());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
    initializePiece();
  };

  // Reset game
  const resetGame = () => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    setBoard(createEmptyBoard());
    setCurrentPiece(null);
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(false);
  };

  // Render board with current piece
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    if (currentPiece && !gameOver) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x] && position.y + y >= 0) {
            displayBoard[position.y + y][position.x + x] = currentPiece.color;
          }
        }
      }
    }
    
    return displayBoard;
  };

  const displayBoard = renderBoard();

  return (
    <div className="tetris-container">
      <div className="tetris-game">
        <h1 className="tetris-title">TETRIS</h1>
        
        <div className="tetris-main">
          <div className="tetris-info">
            <div className="info-panel">
              <h3>Score</h3>
              <p className="info-value">{score}</p>
            </div>
            <div className="info-panel">
              <h3>Level</h3>
              <p className="info-value">{level}</p>
            </div>
            <div className="info-panel">
              <h3>Lines</h3>
              <p className="info-value">{lines}</p>
            </div>
          </div>

          <div className="tetris-board-container">
            {gameOver && (
              <div className="game-overlay">
                <h2>Game Over!</h2>
                <p>Final Score: {score}</p>
                <button onClick={startGame} className="tetris-button">
                  Play Again
                </button>
              </div>
            )}
            
            {!gameStarted && !gameOver && (
              <div className="game-overlay">
                <h2>Welcome to Tetris!</h2>
                <button onClick={startGame} className="tetris-button">
                  Start Game
                </button>
              </div>
            )}
            
            {isPaused && gameStarted && !gameOver && (
              <div className="game-overlay">
                <h2>Paused</h2>
                <p>Press P to resume</p>
              </div>
            )}

            <div className="tetris-board">
              {displayBoard.map((row, y) => (
                <div key={y} className="tetris-row">
                  {row.map((cell, x) => (
                    <div
                      key={`${y}-${x}`}
                      className={`tetris-cell ${cell ? 'filled' : ''}`}
                      style={{
                        backgroundColor: cell || '#1a1a2e'
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="tetris-controls">
            <h3>Controls</h3>
            <div className="control-item">
              <span className="control-key">←/→</span>
              <span>Move</span>
            </div>
            <div className="control-item">
              <span className="control-key">↓</span>
              <span>Soft Drop</span>
            </div>
            <div className="control-item">
              <span className="control-key">↑/Space</span>
              <span>Rotate</span>
            </div>
            <div className="control-item">
              <span className="control-key">Enter</span>
              <span>Hard Drop</span>
            </div>
            <div className="control-item">
              <span className="control-key">P</span>
              <span>Pause</span>
            </div>
            
            {gameStarted && (
              <button onClick={resetGame} className="tetris-button reset-btn">
                Reset Game
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tetris;
