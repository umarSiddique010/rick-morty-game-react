# Rick and Morty Memory Card Game — Class-Based React Architecture, Animated UI, Testing and CI CD integrated

<div align="center">

<img src="./src/assets/Logo.png" alt="Rick and Morty Memory Card Game" width="150" height="150" />

#### A responsive memory card game built with legacy React class components, featuring dynamic API integration, custom animations, and testing coverage

<!-- TECHNOLOGIES & TOOLS USED -->

## Tech Stack & Tools

[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Class Components](https://img.shields.io/badge/React-Class_Components-blue?style=flat-square&logo=react)](#)
[![Create React App](https://img.shields.io/badge/CRA-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://create-react-app.dev/)
[![Framer Motion](https://img.shields.io/badge/Motion_React-Animations-FF6B6B?style=flat-square&logo=framer)](https://motion.dev/)
[![Rick and Morty API](https://img.shields.io/badge/Rick_&_Morty_API-0052cc?style=flat-square)](https://rickandmortyapi.com/)
[![LocalStorage](https://img.shields.io/badge/LocalStorage-State_Persistence-yellowgreen?style=flat-square)](#)
[![Web Audio API](https://img.shields.io/badge/Sound-Web_Audio_API-orange?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Jest](https://img.shields.io/badge/Jest-Tests-C21325?style=flat-square&logo=jest)](https://jestjs.io/)
[![Testing Library](https://img.shields.io/badge/React_Testing_Library-8A2BE2?style=flat-square)](https://testing-library.com/)
[![Prettier](https://img.shields.io/badge/Prettier-Code_Formatter-F7B93E?style=flat-square&logo=prettier)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/ESLint-Linter-4B32C3?style=flat-square&logo=eslint)](https://eslint.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=flat-square&logo=githubactions)](https://docs.github.com/en/actions)

---

</div>

A responsive memory card game built with **class-based React components** for learning React fundamentals. Features API integration, animations, and testing. Uses Create React App (deprecated) intentionally to understand legacy React patterns.

> **Learning Focus**: Built with class components and lifecycle methods to understand React's core concepts before moving to modern hooks-based development. Includes comprehensive testing with Jest, code quality with ESLint, automated formatting with Prettier, test coverage reporting, and CI/CD pipeline integration to learn professional development workflows..

---

## Performance Metrics

<div align="center">

| Metric             | Score   | Status     |
| ------------------ | ------- | ---------- |
| **Accessibility**  | 88/100  | ✅ Good    |
| **Best Practices** | 100/100 | ✅ Perfect |
| **SEO**            | 100/100 | ✅ Perfect |

_Lighthouse audit results demonstrating production-ready optimization and accessibility compliance_

</div>

---

## Components

### App Component

- **Location:** `src/App.js`
- **Purpose:** Root component managing game state, routing, and data persistence
- **Features:**
  - Class-based architecture with centralized state management
  - LocalStorage integration for high scores (`rick_and_morty_memory_game` key)
  - AnimatePresence for screen transitions
  - State: `fetchedData`, `shuffleCards`, `clickedCards`, `timeLeft`, `highestScore`, `level`
  - Level-based timers (Easy: 210s, Medium: 120s, Hard: 40s)
  - `componentDidUpdate` lifecycle for game completion detection
  - Method binding in constructor for state setters
  - Unit tests with mocked Audio API

### StartGame Component

- **Location:** `src/Components/StartGame/`
- **Files:** `StartGame.js`, `StartGame.module.css`
- **Purpose:** Main menu with difficulty selection
- **Features:**
  - Motion/react page transitions (`motion.main`)
  - Three difficulty levels with level-specific audio
  - Resume game functionality
  - Custom Rick & Morty font integration (`get_schwifty.woff2`)
  - Responsive design with CSS Modules
  - Unit tests with React Testing Library

### PlayGame Component

- **Location:** `src/Components/PlayGame/`
- **Files:** `PlayGame.js`, `PlayGame.module.css`
- **Purpose:** Main game screen orchestrating game components
- **Features:**
  - Container for ScoreBoard, TimerBoard, CardContainer
  - Audio lifecycle management (starts/pauses music)
  - Fixed header with backdrop blur effects
  - Memory leak prevention with timeout cleanup
  - Responsive layout switching
  - Unit tests covering audio integration

### GameOver Component

- **Location:** `src/Components/GameOver/`
- **Files:** `GameOver.js`, `GameOver.module.css`
- **Purpose:** Post-game results screen
- **Features:**
  - Motion/react spring animations (`stiffness: 120, damping: 15`)
  - Dynamic messages: "YOU NAILED IT" or "GAME OVER"
  - Score display with MM:SS time formatting
  - Color-coded performance indicators (green/yellow/red)
  - "Play Again" and "Back to Lobby" buttons
  - Proper cleanup in `componentWillUnmount`
  - Unit tests covering audio and interactions

### CardContainer Component

- **Location:** `src/Components/CardContainer/`
- **Files:** `CardContainer.js`, `CardContainer.module.css`
- **Purpose:** Game board managing API data and card rendering
- **Features:**
  - Rick and Morty API integration (`https://rickandmortyapi.com/api/character/`)
  - Fisher-Yates shuffle algorithm for card randomization
  - Motion/react slide-up animation (`y: 100 → 0, opacity: 0 → 1`)
  - Race condition prevention using `this.ignore` flag
  - Loading and error states
  - Memory leak prevention in `componentWillUnmount`
  - Unit tests covering API integration and lifecycle

### Card Component

- **Location:** `src/Components/Card/`
- **Files:** `Card.js`, `Card.module.css`
- **Purpose:** Individual character cards with click interactions
- **Features:**
  - Duplicate click detection and game over triggers
  - Audio feedback with GameSounds class
  - CSS 3D transforms on hover (`scale3d(1.1, 1.1, 1.1)`)
  - Responsive sizing: 150px×200px → 220px×290px → 320px×390px
  - Data attributes for testing (`data-testid="card"`, `data-id={cardID}`)
  - Smooth transitions (0.4s card, 0.6s content)
  - Unit tests covering interactions and game over

### ScoreBoard Component

- **Location:** `src/Components/ScoreBoard/`
- **Files:** `ScoreBoard.js`, `ScoreBoard.module.css`
- **Purpose:** Real-time score tracking with audio controls
- **Features:**
  - Live score display: current, highest, cards remaining
  - Color-coded feedback (green/yellow/red)
  - Motion/react animations with staggered timing
  - Integrated mute/unmute with React Icons (`GiSoundOn`, `GiSoundOff`)
  - `componentDidUpdate` for score comparison
  - Unit tests including audio integration

### TimerBoard Component

- **Location:** `src/Components/TimerBoard/`
- **Files:** `TimerBoard.js`, `TimerBoard.module.css`
- **Purpose:** Countdown timer with automatic game over
- **Features:**
  - MM:SS format display
  - Level-based time limits
  - Automatic game over at zero
  - Proper interval cleanup using lifecycle methods
  - Unit tests including timer behavior

### SoundToggleButton Component

- **Location:** `src/Components/SoundToggleButton/`
- **Files:** `SoundToggleButton.js`, `SoundToggleButton.module.css`
- **Purpose:** Fixed-position audio toggle button
- **Features:**
  - Toggle icons with React Icons (`AiFillSound`, `MdVolumeOff`)
  - GameSounds class integration
  - Responsive design for mobile/desktop
  - Unit tests with React Testing Library

---

## Audio System

### GameSounds Class

- **Location:** `src/GameSounds.js`
- **Mock Location:** `src/__mocks__/GameSounds.js`
- **Purpose:** Centralized audio management system handling all game sounds and background music
- **Features:**
  - Audio file management for 7 distinct sound effects: card clicks, difficulty buttons, lobby navigation, and background music
  - Volume optimization with custom levels: card clicks (0.32), buttons (0.5), lobby BGM (0.3), gameplay BGM (0.15)
  - Audio cloning using `cloneNode()` for simultaneous sound playback without interruption
  - Global mute/unmute functionality with boolean state management
  - Background music loop management with automatic play/pause based on mute state
  - Error handling for audio playback with `AbortError` filtering to prevent console spam
  - Context-aware audio switching in `toggleGameSound()` method (playGame vs gameOver contexts)
  - Type validation for mute parameter with descriptive error messages
  - Promise-based audio playback with catch handlers for browser autoplay policies
  - Mock implementation for testing with Jest function mocking

---

## Testing Suite

### Test Files Location: `src/__tests__/`

- `App.test.js` - App component integration and state management
- `StartGame.test.js` - Menu interactions and difficulty selection
- `PlayGame.test.js` - Game orchestration and audio lifecycle
- `GameOver.test.js` - Results display and navigation
- `CardContainer.test.js` - API integration and shuffle logic
- `Card.test.js` - Individual card interactions and game over
- `ScoreBoard.test.js` - Score tracking and audio controls
- `TimerBoard.test.js` - Timer functionality and cleanup
- `SoundToggleButton.test.js` - Audio toggle functionality

### Mock Files Location: `src/__mocks__/`

- `GameSounds.js` - Mock audio system for testing

---

## Styling System

### Global Styles

- **Location:** `src/index.css`
- **Purpose:** Global CSS reset, font imports, and base styles
- **Features:**
  - Custom Rick & Morty font integration (`get_schwifty.woff2`)
  - CSS reset and box-sizing normalization
  - Root CSS custom properties for theming
  - Global typography and body styles

### Utility Classes

- **Location:** `src/utility.css`
- **Purpose:** Reusable utility classes for consistent styling
- **Features:**
  - Color utility classes (green/yellow/red performance indicators)
  - Typography utilities
  - Spacing and layout helpers
  - Animation utility classes

### Component Styles (CSS Modules)

Each component has its own `.module.css` file:

- `StartGame.module.css` - Menu styling with animations
- `PlayGame.module.css` - Game layout with backdrop effects
- `GameOver.module.css` - Results screen with spring animations
- `CardContainer.module.css` - Game board layout and responsiveness
- `Card.module.css` - Individual card styling with hover effects
- `ScoreBoard.module.css` - Score display and audio controls
- `TimerBoard.module.css` - Timer display styling
- `SoundToggleButton.module.css` - Audio toggle button styling

---

## Project Structure

```
rick-and-morty-card-game-react/
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI/CD pipeline
├── public/
│   ├── sounds/
│   │   └── [audio files]
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── Components/
│   │   ├── App.js
│   │   ├── StartGame/
│   │   │   ├── StartGame.js
│   │   │   └── StartGame.module.css
│   │   ├── PlayGame/
│   │   │   ├── PlayGame.js
│   │   │   └── PlayGame.module.css
│   │   ├── GameOver/
│   │   │   ├── GameOver.js
│   │   │   └── GameOver.module.css
│   │   ├── CardContainer/
│   │   │   ├── CardContainer.js
│   │   │   └── CardContainer.module.css
│   │   ├── Card/
│   │   │   ├── Card.js
│   │   │   └── Card.module.css
│   │   ├── ScoreBoard/
│   │   │   ├── ScoreBoard.js
│   │   │   └── ScoreBoard.module.css
│   │   ├── TimerBoard/
│   │   │   ├── TimerBoard.js
│   │   │   └── TimerBoard.module.css
│   │   └── SoundToggleButton/
│   │       ├── SoundToggleButton.js
│   │       └── SoundToggleButton.module.css
│   ├── __mocks__/
│   │   └── GameSounds.js           # Mock audio for testing
│   ├── __tests__/
│   │   ├── App.test.js
│   │   ├── StartGame.test.js
│   │   ├── PlayGame.test.js
│   │   ├── GameOver.test.js
│   │   ├── CardContainer.test.js
│   │   ├── Card.test.js
│   │   ├── ScoreBoard.test.js
│   │   ├── TimerBoard.test.js
│   │   └── SoundToggleButton.test.js
│   ├── assets/
│   │   ├── get_schwifty.woff2
│   │   ├── Logo.png
│   │   └── [other assets]
│   ├── index.js
│   ├── index.css
│   ├── utility.css
│   └── GameSounds.js
├── coverage/                       # Test coverage reports
├── node_modules/
├── .eslintignore                   # ESLint ignore patterns
├── .prettierignore                 # Prettier ignore patterns
├── .prettierrc                     # Prettier configuration
├── babel.config.js                 # Babel configuration for Jest
├── eslint.config.mjs               # ESLint configuration
├── jest.assetMock.js               # Jest asset mocking
├── jest.config.mjs                 # Jest configuration
├── jest.setup.js                   # Jest test environment setup
├── jest.styleMock.js               # Jest CSS modules mocking
├── .gitignore
├── package.json                    # Dependencies and scripts
├── package-lock.json
└── README.md
```

---

## Tech Stack

### Core Technologies

| Technology         | Purpose                                                                   |
| ------------------ | ------------------------------------------------------------------------- |
| React 19           | UI development with class components                                      |
| motion/react       | Page transitions and animations                                           |
| CSS Modules        | Scoped styling per component                                              |
| React Icons        | Icon components (`GiSoundOn`, `GiSoundOff`, `AiFillSound`, `MdVolumeOff`) |
| Rick and Morty API | External character data                                                   |

### Testing & Quality Assurance

| Technology                  | Purpose                                   |
| --------------------------- | ----------------------------------------- |
| Jest                        | Unit testing framework with custom config |
| React Testing Library       | Component testing utilities               |
| @testing-library/user-event | User interaction testing                  |
| Coverage Reports            | Test coverage tracking and reporting      |

### Code Quality & Formatting

| Technology | Purpose                              |
| ---------- | ------------------------------------ |
| ESLint     | Code quality and error detection     |
| Prettier   | Consistent code formatting           |
| Babel      | JavaScript transpilation for testing |

### CI/CD & Automation

| Technology     | Purpose                      |
| -------------- | ---------------------------- |
| GitHub Actions | Automated CI/CD pipeline     |
| Node.js 20     | Runtime environment          |
| npm scripts    | Task automation and workflow |

---

## Features

### Core Game Features

- **Class-Based React** - Built with class components and lifecycle methods for learning React fundamentals
- **API Integration** - Rick and Morty API with error handling and loading states
- **Audio System** - Custom GameSounds class with mute/unmute functionality
- **Animations** - Motion/react for page transitions and UI animations
- **Responsive Design** - CSS Modules with mobile-first approach
- **Game Logic** - Card shuffle algorithm, duplicate detection, timer system
- **LocalStorage** - Persistent high scores and game state

### Development & Quality Features

- **Automated Testing** - Jest with React Testing Library and 100% coverage tracking
- **Code Quality** - ESLint with React, accessibility, and testing plugins
- **Code Formatting** - Prettier with consistent style enforcement
- **CI/CD Pipeline** - GitHub Actions with automated testing, linting, and formatting checks
- **Modern Tooling** - ES modules, React 19, and professional development workflow
- **Error Prevention** - Comprehensive linting rules and automated quality gates

---

## Game Rules

1. **Choose Difficulty:** Select Easy, Medium, or Hard to begin
2. **Beat the Clock:** Each difficulty has a different time limit
3. **Click Unique Cards:** Click each card only once - no repeats!
4. **Cards Reshuffle:** Cards randomize after every click
5. **Game Over Conditions:** Game ends if you repeat a card OR time runs out
6. **Win Condition:** Complete all unique selections before time expires
7. **Track Progress:** Monitor your score and try to beat your highest score

---

## Installation & Development

### Quick Start

```bash
# Clone the repository
git clone https://github.com/umarSiddique010/rick-and-morty-card-game.git
cd rick-and-morty-card-game

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start
```

### Available Scripts

#### Development

```bash
npm start                    # Start development server
npm run build               # Create production build
npm run eject               # Eject from Create React App (irreversible)
```

#### Testing

```bash
npm test                    # Run tests in watch mode
npm run test:coverage       # Run tests with coverage report
```

#### Code Quality

```bash
npm run lint                # Check code with ESLint
npm run lint:fix            # Auto-fix ESLint issues
npm run format              # Format code with Prettier
npm run format:check        # Check if code is formatted
```

### CI/CD Pipeline

The project includes automated GitHub Actions workflow that runs on every push and pull request:

- ✅ **Code Linting** - ESLint checks for code quality
- ✅ **Format Validation** - Prettier ensures consistent formatting
- ✅ **Automated Testing** - Jest runs full test suite with coverage
- ✅ **Coverage Reports** - Uploads test coverage artifacts

### Development Workflow

1. **Write Code** → 2. **Auto-format** → 3. **Lint Check** → 4. **Run Tests** → 5. **Commit** → 6. **CI Validation**

---

## Contact

**Md Umar Siddique**

<div align="center">

[![GitHub](https://img.shields.io/badge/@umarSiddique010-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/umarSiddique010)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Md%20Umar%20Siddique-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/md-umar-siddique-1519b12a4/)
[![npm](https://img.shields.io/badge/npm-@umarsiddique010-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/~umarsiddique010)
[![Email](https://img.shields.io/badge/us70763@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:us70763@gmail.com)

</div>
