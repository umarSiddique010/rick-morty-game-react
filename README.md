# <img height="25" src="./src/assets/Logo.png" alt="Logo"> Rick & Morty Memory Game

<hr/>

<div align="center">

![Project Banner](https://placehold.co/1200x300/183b4e/ffffff?text=Rick+%26+Morty+Memory+Game)

# A React Class-Component Masterclass

**A production-grade React application engineered to demonstrate a deep understanding of core React fundamentals. Built entirely with Class-Based Components to showcase explicit lifecycle management, rigorous state architecture, and enterprise-level CI/CD pipelines.**

[![React](https://img.shields.io/badge/React-Class_Components-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Jest](https://img.shields.io/badge/Jest-Tested-C21325?logo=jest&logoColor=white)](https://jestjs.io/)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-Pipeline-2088FF?logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Prettier](https://img.shields.io/badge/Code_Style-Prettier-F7B93E?logo=prettier&logoColor=black)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/Linter-ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)

</div>

---

---

## 🚀 Features & Architecture

### 🧐 The Philosophy: Why Class Components?

In an era dominated by Functional Components and Hooks, this project serves as a **deliberate architectural showcase** of core React fundamentals. By strictly utilizing Class Components, this codebase demonstrates:

- **Explicit Lifecycle Management:** Granular control over component behavior using `componentDidMount` (for API calls and timers), `componentDidUpdate` (for score tracking and game-over logic), and `componentWillUnmount` (for preventing memory leaks by clearing intervals and audio streams).
- **Context Binding & `this`:** A deep understanding of JavaScript scope, `this` binding in constructors, and event handler management without relying on `useCallback`.
- **State Architecture:** `App.js` acts as the single source of truth, lifting state up and passing callbacks down to children like `ScoreBoard` and `Card`, ensuring unidirectional data flow.

### ⚡ Core Functionality

- **REST API Integration:** Asynchronously fetches character data from the **Rick and Morty API**, handling loading states and errors gracefully within the `CardContainer` lifecycle.
- **Fluid Animations:** Utilizes **Framer Motion** (`motion/react`) to orchestrate complex entrance and exit animations for the game board, modals, and score updates.
- **Immersive Audio Engine:** Features a dedicated `GameSounds.js` class that manages `Audio` instances, background music loops, and sound effects with a global mute toggle.
- **Responsive UI:** Built with **CSS Modules** to ensure locally scoped styles, preventing class name collisions while maintaining a fully responsive design across devices.

---

## 🛠 Tech Stack

| Category                 | Technology                          |
| :----------------------- | :---------------------------------- |
| **Core Framework**       | React 19 (Class-Based Architecture) |
| **Language**             | JavaScript (ES6+)                   |
| **Styling**              | CSS Modules, Utility Classes        |
| **Animation**            | Framer Motion (`motion/react`)      |
| **Testing**              | Jest, React Testing Library         |
| **Linting & Formatting** | ESLint, Prettier                    |
| **CI/CD**                | GitHub Actions                      |

---

## 🧪 Testing Strategy

This project employs a "Test-Driven mindset" with a robust suite covering Unit, Integration, and Logic tests.

- **Unit Testing:** Individual components like `Card.js` and `TimerBoard.js` are tested in isolation to ensure they render props correctly and fire events as expected.
- **Integration Testing:** `App.test.js` simulates full user flows—starting the game, clicking cards, and triggering game-over states—to verify component interaction.
- **Mocking:**
  - **Audio API:** The `GameSounds.js` class is fully mocked in `src/__mocks__/GameSounds.js` to prevent audio playback issues in the test environment.
  - **Fetch API:** Global `fetch` is mocked to simulate API responses for deterministic testing of the `CardContainer`.
- **Coverage:** The pipeline enforces high test coverage, runnable via `npm run test:coverage`.

---

## ⚙️ CI/CD & Quality Assurance

Code quality is enforced via a strict **GitHub Actions** pipeline defined in `.github/workflows/ci.yml`. No code reaches production without passing these gates:

1.  **Dependency Installation:** Ensures a clean slate using `npm install --legacy-peer-deps`.
2.  **Linting:** Runs `npm run lint` (ESLint) to catch static errors and enforce coding standards.
3.  **Formatting:** Runs `npm run format:check` (Prettier) to ensure stylistic consistency.
4.  **Test Suite:** Executes `npm run test:coverage` to verify business logic and prevent regressions.

---

## 🚀 Setup Instructions

Follow these steps to run the application locally.

### Prerequisites

- Node.js (v18 or v20 recommended)
- npm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/umarSiddique010/rick-morty-game-react.git

    cd rick-and-morty-memory-game
    ```

2.  **Install dependencies:**
    _Note: The project uses React 19 with some legacy dependencies._

    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Start the development server:**

    ```bash
    npm start
    ```

4.  **Run Quality Checks**

    ```bash
    # Run Linter
    npm run lint

    # Check Formatting
    npm run format:check

    # Run Test Suite with Coverage
    npm run test:coverage
    ```

### Development Commands

| Command                 | Description                                                  |
| :---------------------- | :----------------------------------------------------------- |
| `npm start`             | Runs the app in development mode at `http://localhost:3000`. |
| `npm run test`          | Launches the test runner in interactive watch mode.          |
| `npm run test:coverage` | Runs tests once and generates a coverage report.             |
| `npm run lint`          | Checks the codebase for linting errors.                      |
| `npm run format`        | Auto-formats code using Prettier.                            |

---

## 📂 Project Structure

```text
src/
├── __mocks__/            # Jest mocks for GameSounds and Audio
├── __test__/             # Comprehensive test suite (Unit & Integration)
├── assets/               # Fonts, Images, and Wallpapers
├── Components/
│   ├── Card/             # Individual Memory Card component
│   ├── CardContainer/    # Grid layout and API fetching logic
│   ├── GameOver/         # Game Over modal with score summary
│   ├── PlayGame/         # Main game orchestrator
│   ├── ScoreBoard/       # HUD for Score, High Score, and Cards Left
│   ├── SoundToggleButton/# Global audio control
│   ├── StartGame/        # Landing page and Level selection
│   └── TimerBoard/       # Countdown timer logic
├── App.js                # Root Component & State Container
├── GameSounds.js         # Audio Class for SFX and BGM management
├── index.css             # Global variables and resets
└── setupTests.js         # Jest configuration
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p><strong>Developed by Md Umar Siddique</strong></p>

  <a href="https://www.linkedin.com/in/md-umar-siddique-1519b12a4/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://www.npmjs.com/~umarSiddique010">
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" />
  </a>
  <a href="https://dev.to/umarsiddique010">
    <img src="https://img.shields.io/badge/DEV.to-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white" alt="DEV Community" />
  </a>
  <a href="https://github.com/umarSiddique010">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="mailto:us70763@gmail.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>

<br/><br/>

  <p>
    <strong>Project Links:</strong> 
    <a href="https://rick-morty-game-react.vercel.app/">🚀 Live Demo</a> • 
    <a href="https://github.com/umarSiddique010/rick-morty-game-react/issues">🐞 Report an Issue</a> • 
    <a href="https://github.com/umarSiddique010/rick-morty-game-react">⭐ Star this Repo</a>
  </p>
</div>
