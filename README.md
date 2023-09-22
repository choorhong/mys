# Mys Trade with React + TypeScript + Vite + MSW

This template provides a minimal setup to get React working in Vite.

_Please do not open the developer console while running the app. It may cause unexpected behavior due to MSW integration_

## Run the project with docker-compose (recommended):

1. Run `docker-compose up -d` in the terminal.
2. Open [http://localhost:3030](http://localhost:3030) to view it in the browser.

## Run the project with docker commands:

1. Run `docker build -t mys_image .` in the terminal. For example:
2. Run `docker run -p 5178:5173 --name mys_container -d --rm -it mys_image` in the terminal.
3. Open [http://localhost:5178](http://localhost:5178) to view it in the browser.

## Run the project without docker commands:

_Please be aware that the node version installed in your host machine. Required minimum node version of 15!_

1. Install project dependencies with `npm ci`.
2. To start the project locally, run the `dev` script in `package.json`.
3. Follow the instruction in the terminal to access the development server in the browser.
