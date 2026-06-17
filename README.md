<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/MK-DlR/battleship-project">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Battleship</h3>

  <p align="center">
    TDD-based naval themed Battleship game web app with PC vs CPU and local PC vs PC functionality, automatic attack logging, a score counter, and full playability on tablets.
    <br />
    <a href="https://github.com/MK-DlR/battleship-project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://mk-dlr.github.io/battleship-project/">View Demo</a>
    &middot;
    <a href="https://github.com/MK-DlR/battleship-project/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/MK-DlR/battleship-project/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#how-to-use-the-app">How to Use the App</a></li>
        <li><a href="#default-setup-behavior">Default Setup Behavior</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://mk-dlr.github.io/battleship-project/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Javascript][Javascript]][Javascript-url]
- [![Jest][Jest]][Jest-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js (recommended v22+)
- npm

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/MK-DlR/battleship-project.git
   cd battleship-project
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Start the application
   ```sh
   npm start
   ```
4. Open the app at `http://localhost:8080`

### Notes

- Built with: JavaScript + Jest (DOM manipulation, no frameworks)
- Testing: Jest with Babel for ES module support
- Run tests with `npm test`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

This is a Battleship-style game application where players can play against the computer or locally against another player, attempting to sink all of the opponent's ships first.

The application allows for randomized ship placement and hit/miss/ship sunk logging.

### How to Use the App

1. Open the app at http://localhost:8080 or visit the [live demo](https://mk-dlr.github.io/battleship-project/)
2. Play the game:
   - PC vs CPU: Set your name (optional) and press "New Game", randomize and confirm your ship placement, then press "Start Game".
   - Local PC vs PC: Set both player names and press "New Game", both players must randomize and confirm their ship placements, then press "Start Game".
     - Player names can be left blank as long as each "Set Player" button is pressed and "Confirm" is selected for both.
3. Sink all of the opponent's ships to complete the game.
4. Upon game over, select "New Round" to play another round with the same players or "New Game" to change modes and/or names.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Upgrade CSS
- [x] Make tablet friendly
- [x] Add battle log
  - [x] Bug: Various battle log issues
- [x] Bug: Player 2 custom name not always displaying
- [ ] Let players custom place their ships
  - [ ] Drag and drop ships onto board
- [ ] Different AI difficulty selections

See the [open issues](https://github.com/MK-DlR/battleship-project/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

As this is a student project created for The Odin Project curriculum, it is currently not open for contributions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/MK-DlR/battleship-project/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=MK-DlR/battleship-project" alt="contrib.rocks image" />
</a>

<!-- CONTACT -->

## Contact

Adrien Newman - [@MK_DlR](https://twitter.com/MK_DlR) - adriennewman92@gmail.com

Project Link: [Repository](https://github.com/MK-DlR/battleship-project) & [Live Demo](https://mk-dlr.github.io/battleship-project/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [The Odin Project](https://www.theodinproject.com/dashboard)
- [Font Awesome](https://fontawesome.com/)
- [Paper Ship Icon](https://icons8.com/icon/tZVc5UE1D6eZ/paper-ship) by [Icons8](https://icons8.com/)
- [Favicon Converter](https://favicon.io/favicon-converter/)
- [Othneil Drew's Best README Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<p align="center"><img src="images/pirate.gif" alt="Majima as a pirate dodging gold coins"></p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/MK-DlR/battleship-project.svg?style=for-the-badge
[contributors-url]: https://github.com/MK-DlR/battleship-project/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/MK-DlR/battleship-project.svg?style=for-the-badge
[forks-url]: https://github.com/MK-DlR/battleship-project/network/members
[stars-shield]: https://img.shields.io/github/stars/MK-DlR/battleship-project.svg?style=for-the-badge
[stars-url]: https://github.com/MK-DlR/battleship-project/stargazers
[issues-shield]: https://img.shields.io/github/issues/MK-DlR/battleship-project.svg?style=for-the-badge
[issues-url]: https://github.com/MK-DlR/battleship-project/issues
[license-shield]: https://img.shields.io/github/license/MK-DlR/battleship-project.svg?style=for-the-badge
[license-url]: https://github.com/MK-DlR/battleship-project/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/adrien-newman
[product-screenshot]: images/screenshot.gif

<!-- Shields.io badges. You can a comprehensive list with many more badges at: https://github.com/inttter/md-badges -->

[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[EJS]: https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=fff
[EJS-url]: https://ejs.co/
[Express]: https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/en/
[Javascript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000
[Javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Jest]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=fff
[Jest-url]: https://jestjs.io/
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[Postgres]: https://img.shields.io/badge/Postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[Prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[React-router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[React-router-url]: https://reactrouter.com/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=fff
[Vite-url]: https://vite.dev/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
