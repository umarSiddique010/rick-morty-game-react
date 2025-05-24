<div align="center">

<img src="/src/assets/Logo.png" alt="Rick and Morty Memory Card Game" width="150" height="150" />

#### A fun and challenging memory card game built with React class components and Rick and Morty API integration

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Create React App](https://img.shields.io/badge/Create_React_App-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://create-react-app.dev/)
[![Accessibility](https://img.shields.io/badge/Accessibility-100%25-success?style=for-the-badge)](https://www.w3.org/WAI/fundamentals/accessibility-intro/)
[![Best Practices](https://img.shields.io/badge/Best_Practices-100%25-success?style=for-the-badge)](https://web.dev/learn/performance/)
[![API](https://img.shields.io/badge/Rick_and_Morty_API-0052cc?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAASklEQVQoz2NgQAN7MzIwMvBycFhIE8MBFIIggZINPkmYpOkdFmYVEbQQn5DJJmAZON0iCyRjGPyzGKEhKcRiwBqxEIDACfQFL6ytjTyQAAAABJRU5ErkJggg==)](https://rickandmortyapi.com/)

</div>

# Rick and Morty Memory Card Game

A responsive memory card game built with class-based React components, featuring characters from the Rick and Morty API. This project is part of my learning journey through The Odin Project and was created to strengthen my understanding of legacy React architecture and advanced component-based UI logic.

---

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Why Class-Based Components](#why-class-based-components)
- [Why Create React App](#why-create-react-app)
- [Project Structure](#project-structure)
- [Game Rules](#game-rules)
- [Memory Logic](#memory-logic)
- [Installation](#installation)
- [Learning Focus](#learning-focus)
- [Recruiter Context](#recruiter-context)
- [Author](#author)

---

## Live Demo

Coming soon

---

## Features

- **Class-Based React Components:**  
  Implemented the entire game using legacy class-based components to demonstrate deep understanding of React’s foundational concepts, including lifecycle methods (`componentDidMount`, `componentWillUnmount`, `componentDidUpdate`), state management, and method binding with `.bind()`. This choice showcases versatility and the ability to maintain and refactor older React codebases.

- **API Data Fetching and Error Handling:**  
  Integrated the Rick and Morty public API to dynamically fetch character data. Implemented robust error handling and loading states to ensure smooth UX even when network requests fail or are delayed.

- **Shuffle Logic and Game State Management:**  
  Developed an efficient shuffle algorithm to randomize the cards each time a user interacts. Managed game state such as clicked cards, score tracking, and game over conditions entirely within React’s component state and props.

- **Animated UI with `motion/react`:**  
  Used the `motion/react` library for subtle yet impactful animations on game elements like card entry, scoreboard updates, and timer countdowns. This enhances the user experience with polished visual feedback.

- **Responsive and Accessible Design:**  
  Crafted the UI with CSS Modules and responsive media queries, ensuring the game works seamlessly across mobile, tablet, and desktop devices. Maintained accessible HTML semantics, such as button roles and alt text for images.

- **Mobile-First Responsive Design:**  
   Developed with a mobile-first approach, the UI scales gracefully from small mobile screens to large desktops using CSS Modules and media queries. This ensures optimal usability and layout consistency across all devices.

- **Timer and Scoring System:**  
  Implemented a countdown timer that dynamically adjusts based on difficulty level, enforcing game pacing. The scoring system updates live and persists highest scores, encouraging repeat play and competition.

- **Highest Score Persistence with LocalStorage:**  
  Used the browser’s localStorage API to save and retrieve the player’s highest score, enabling score persistence across browser sessions and page reloads for a more engaging user experience.

- **Separation of Concerns:**  
  Structured the project into modular components (`PlayGame`, `CardContainer`, `Card`, `ScoreBoard`, `TimerBoard`) to enhance maintainability, readability, and potential for future feature expansion.

- **Custom Styling with Thematic Fonts and Shadows:**  
  Applied a custom Rick and Morty themed font and consistent color palette that aligns with the game's concept, improving immersion and visual identity.

## Tech Stack

| Technology         | Purpose                              |
| ------------------ | ------------------------------------ |
| React              | UI development with class components |
| CSS Modules        | Scoped styling per component         |
| motion/react       | Smooth and performant animations     |
| Rick and Morty API | External character data              |
| localStorage       | Persistent high score tracking       |

---

## Why Class-Based Components

This project was intentionally built using React class-based components to demonstrate proficiency with legacy React code. Class components are still found in many real-world codebases and understanding their structure, lifecycle methods, and state handling is essential for maintaining or refactoring legacy projects.

---

## Why Create React App

Although Create React App (CRA) is officially deprecated, it was chosen for this project to replicate legacy development environments. CRA remains an excellent learning tool for beginners due to its simplicity and zero-config setup. Using CRA here aligns with the project's overall focus on showcasing legacy practices in a modern context.

---

## Project Structure

```
src/
├── components/
│   ├── PlayGame/
│   ├── CardContainer/
│   ├── Card/
│   ├── ScoreBoard/
│   ├── TimerBoard/
│   ├── StartGame/
│   └── GameOver/
├── App.js
├── index.js
├── index.css
└── assets/
    └── get_schwifty.woff2
```

---

## Game Rules

1. Click each card only once.
2. Cards reshuffle after every click.
3. A repeated click ends the game.
4. Complete all unique selections to win.
5. Beat the timer based on your selected difficulty level.

---

## Memory Logic

- Game state tracks clicked cards and updates score.
- A card click checks for duplicates:
  - If new: card is stored, score is updated, cards reshuffle.
  - If duplicate: game over screen is triggered.
- High score updates in real-time and persists via `localStorage`.
- Timer countdown is conditionally rendered based on difficulty.

---

## Learning Focus

- Practicing state management and component logic in class-based React
- Understanding legacy lifecycle methods such as `componentDidMount` and `componentDidUpdate`
- Using `localStorage` for persistent data in a React environment
- Structuring CSS Modules for reusable, scoped component styling
- Building and organizing a React project using legacy tooling (CRA)

---

## Recruiter Context

This project was designed to demonstrate my ability to work with legacy React codebases and replicate older development environments. It showcases my understanding of class components, state and props management, lifecycles, animations, responsive layouts, and external API integration. By structuring this project intentionally using deprecated tools and patterns, I aimed to show adaptability and a well-rounded approach to both modern and older stacks.

---

## Author

[Md Umar Siddique](https://github.com/umarSiddique010)
