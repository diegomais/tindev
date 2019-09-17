# GoBarber

> Book barber service 💈.

This is the back-end server for scheduling and managing scheduled appointments in the [mobile app](https://github.com/diegomais/gobarber-mobile) and [front-end app](https://github.com/diegomais/gobarber-web).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The project can be built with npm or yarn, so choose one of the approach bellow in case you don't have any installed on your system.

* **Npm** is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer. [Download Node.js](https://nodejs.org/en/download/)

* **Yarn** is a package manager built by Facebook Team and seems to be faster than npm in general.  [Download Yarn](https://yarnpkg.com/en/docs/install)

### Setting up Databases and Services

The project uses [PostgreSQL](https://www.postgresql.org), [MongoDB](https://www.mongodb.com) and [Redis](https://redis.io).

We recommend use [Docker](https://www.docker.com) to install and run the databases and services above.

### Installing

To download the project follow the instructions bellow:

```
1. git clone https://github.com/diegomais/gobarber-backend.git
2. cd gobarber-backend
```

Then install dependencies and run:

```
3. yarn install
4. yarn run dev
```

or

```
3. npm install
4. npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
