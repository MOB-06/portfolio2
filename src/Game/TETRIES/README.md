# Tetris Game Component

A fully functional Tetris game built with React.

## Features

- **Classic Tetris Gameplay**: All 7 standard tetromino shapes (I, O, T, S, Z, J, L)
- **Score System**: Points awarded for clearing lines (1 line = 100, 2 lines = 300, 3 lines = 500, 4 lines = 800)
- **Level Progression**: Increases difficulty every 10 lines cleared
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Gradient backgrounds, animations, and cyan accent colors
- **Game States**: Welcome screen, Playing, Paused, and Game Over screens

## Controls

- **←/→ Arrow Keys**: Move piece left/right
- **↓ Arrow Key**: Soft drop (speed up falling)
- **↑ Arrow Key / Space**: Rotate piece
- **Enter**: Hard drop (instant drop to bottom)
- **P**: Pause/Resume game

## Usage

### Import the component:

```javascript
import Tetris from './Game/TETRIES/tetris.jsx';
// or
import { Tetris } from './Game/TETRIES';
```

### Use in your app:

```javascript
function App() {
  return (
    <div>
      <Tetris />
    </div>
  );
}
```

## File Structure

```
Game/
└── TETRIES/
    ├── tetris.jsx    # Main game component with logic
    ├── tetris.css    # Styling for the game
    └── index.js      # Export file
```

## Game Logic

- **Board Size**: 10 columns × 20 rows
- **Initial Drop Speed**: 1000ms per cell
- **Speed Increase**: 100ms faster per level
- **Minimum Speed**: 100ms per cell (level 10+)

## Customization

You can customize the game by modifying the constants at the top of `tetris.jsx`:

```javascript
const BOARD_WIDTH = 10;           // Board columns
const BOARD_HEIGHT = 20;          // Board rows
const BASE_DROP_SPEED = 1000;     // Initial drop speed in ms
const MIN_DROP_SPEED = 100;       // Fastest drop speed in ms
const SPEED_INCREASE_PER_LEVEL = 100; // Speed increase per level
```

## Browser Compatibility

Works on all modern browsers that support:
- React 18+
- CSS Grid and Flexbox
- ES6+ JavaScript features

## License

Part of the portfolio2 project.
