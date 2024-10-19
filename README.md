<h1 align="center">
    <img alt="Tindev" src="mobile/assets/logo.png" /><br>
    <b>Tindev: A tinder clone for developers</b> 🔥
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/diegomais/tindev?style=for-the-badge">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/diegomais/tindev?style=for-the-badge">
  <img alt="GitHub license" src="https://img.shields.io/github/license/diegomais/tindev?style=for-the-badge">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/diegomais/tindev?style=for-the-badge">
</p>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#seat-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#thinking-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

## :rocket: Technologies

This project was developed with the following technologies:

- [Node.js](https://nodejs.org)
- [React](https://reactjs.org)

Extras:

- Main Libs
  - [Express](https://expressjs.com)
  - [Mongoose ODM](https://mongoosejs.com)
- Style
  - [EditorConfig](https://editorconfig.org)
  - [ESLint](https://eslint.org)
  - [Prettier](https://prettier.io)

## :seat: Getting started

These instructions will get you a copy of the full project up and running on your local machine for development and testing purposes.

#### Setting up the development environment

The project is developed using Git. Git is a free and open source distributed version control system. [Download Git](https://git-scm.com/downloads).

The project is built with PNPm. PNPm is a fast, disk space efficient package manager. [Installation](https://pnpm.io/installation).

### Cloning the project

You can obtain the project by running the instruction bellow on your terminal:

`git clone https://github.com/diegomais/tindev.git`

#### Setting up the database

The project uses [MongoDB](https://www.mongodb.com).

We recommend use [Docker](https://www.docker.com) to install and run the database above.

1. Install [Docker Desktop](https://www.docker.com/get-started).
2. Start a MongoDB instance:
   `docker run --name tindev-mongo -p 27017:27107 -d mongo`

### API

#### Adding environment variables

1. Rename the file `.env.example` on `backend` directory to `.env`.
2. Add the MongoDB URI (e.g. `mongodb://localhost:27017/tindev`) into `.env` file.

#### Installing dependencies and running the server

Run the instructions bellow inside `backend` directory:

1. `pnpm install --frozen-lockfile`
2. `pnpm dev`

### Web

Web application available at [https://diegomais-tindev.netlify.app](https://diegomais-tindev.netlify.app).

#### Adding environment variables

1. Rename the file `.env.example` on `frontend` directory to `.env`.
2. Add the API URL (e.g. `http://localhost:3333`) into `.env` file.

#### Installing dependencies and running the web application

Run the instructions bellow inside `frontend` directory:

1. `pnpm install --frozen-lockfile`
2. `pnpm dev`

### Mobile

With an Android phone, you can load this project immediately at [https://expo.io/@diegomais/tindev](https://expo.io/@diegomais/tindev).

#### Setting up the development environment

Follow the instructions for Expo CLI available in the official [React Native Documentation](https://reactnative.dev/docs/environment-setup).

#### Adding environment variables

1. Rename the file `environment.example.js` on `mobile` directory to `environment.js`.
2. Add the API URL (e.g. `http://localhost:3333`) into `.env` file.

#### Installing dependencies and running the mobile application

Run the instructions bellow inside `mobile` directory:

1. `npm install`
2. `expo start`

or

1. `yarn install`
2. `expo start`

## :thinking: How to contribute

- Fork this repository;
- Create a branch with your feature: `git checkout -b my-feature`;
- Commit your changes: `git commit -m '[feat](scope) My new feature'`;
- Push to your branch: `git push origin my-feature`.

After the merge of your pull request is done, you can delete your branch.

## :memo: License

This project is under the MIT license. See the [LICENSE](LICENSE) for more details.

---

Made with :heart: by [Diego Mais](https://diegomais.github.io/) :wave:.
