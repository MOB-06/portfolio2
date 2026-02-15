# Tetris Game Component

This directory contains a fully functional Tetris game built with React.

## Files

- `tetris.jsx` - Main Tetris game component
- `tetris.css` - Styling for the Tetris game
- `AppWithTetris.example.js` - Example showing how to integrate Tetris into the app with routing

## Dependencies

All required dependencies are already included in the main `package.json`:

- **react** (^18.1.0) - Core React library
- **react-dom** (^18.1.0) - React DOM rendering
- **react-router-dom** (^7.13.0) - Optional, for routing to the game

No additional npm packages are needed to run the Tetris game!

## Features

- Classic Tetris gameplay
- Keyboard controls (Arrow keys + Space)
- Score tracking
- Pause/Resume functionality
- Responsive design for mobile and desktop
- Game over detection
- Line clearing with scoring

## How to Use

### Option 1: As a Standalone Page (with Routing)

1. Import the Tetris component in your `App.js`:
```jsx
import Tetris from '../Game/tetris';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
```

2. Add a route for the Tetris game:
```jsx
<Router>
  <Routes>
    <Route path="/" element={<YourHomePage />} />
    <Route path="/tetris" element={<Tetris />} />
  </Routes>
</Router>
```

3. Navigate to `/tetris` to play the game.

### Option 2: As a Component in Your Page

Simply import and use the Tetris component anywhere:

```jsx
import Tetris from '../Game/tetris';

function YourComponent() {
  return (
    <div>
      <h1>Games</h1>
      <Tetris />
    </div>
  );
}
```

### Option 3: See the Example

Check out `AppWithTetris.example.js` for a complete example of integrating Tetris with routing.

## Controls

- **← →** (Left/Right Arrow) - Move piece left/right
- **↑** (Up Arrow) - Rotate piece
- **↓** (Down Arrow) - Move piece down faster
- **Space** - Hard drop (instantly drop piece to bottom)
- **P** - Pause/Resume game

## Running the Game

1. Make sure all dependencies are installed:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Either:
   - Navigate to the Tetris route (if you added routing)
   - Or view it wherever you placed the component

## Customization

You can customize the game by modifying:

- **Colors**: Change `SHAPE_COLORS` in `tetris.jsx`
- **Board Size**: Change `BOARD_WIDTH` and `BOARD_HEIGHT` constants
- **Speed**: Modify the interval in the `useEffect` hook (currently 1000ms)
- **Styling**: Edit `tetris.css` to change the appearance

## Browser Compatibility

The game works on all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- React 18+

## Mobile Support

The game includes responsive CSS but is best played on desktop with a keyboard. Mobile support can be added by implementing touch controls.

## License

Part of the personal-portfolio project.
