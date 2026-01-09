# Reader Haven / BookSwap

## Tech Stack
<div align="center">
	<a href="#"><img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=061826" alt="React" /></a>
	<a href="#"><img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=fff" alt="Vite" /></a>
	<a href="#"><img src="https://img.shields.io/badge/Redux%20Toolkit-2-764ABC?logo=redux&logoColor=fff" alt="Redux Toolkit" /></a>
	<a href="#"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=fff" alt="Tailwind CSS" /></a>
	<a href="#"><img src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=fff" alt="React Router" /></a>
	<a href="#"><img src="https://img.shields.io/badge/Socket.io-Client-010101?logo=socketdotio&logoColor=fff" alt="Socket.io" /></a>
	<a href="#"><img src="https://img.shields.io/badge/Axios-1-5A29E4?logo=axios&logoColor=fff" alt="Axios" /></a>
	<a href="#"><img src="https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=fff" alt="Node.js" /></a>
	<a href="#"><img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=fff" alt="Express" /></a>
	<a href="#"><img src="https://img.shields.io/badge/MongoDB-9-47A248?logo=mongodb&logoColor=fff" alt="MongoDB" /></a>
	<a href="#"><img src="https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=fff" alt="JWT" /></a>
	<a href="#"><img src="https://img.shields.io/badge/Multer-Uploads-4B5563" alt="Multer" /></a>
	<a href="#"><img src="https://img.shields.io/badge/Nodemailer-Gmail_OAuth2-2da54e?logo=maildotru&logoColor=fff" alt="Nodemailer" /></a>
	<a href="#"><img src="https://img.shields.io/badge/ImageKit-CDN-1f9de5" alt="ImageKit" /></a>
	<a href="#"><img src="https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=fff" alt="ESLint" /></a>
	<a href="#"><img src="https://img.shields.io/badge/Nodemon-Dev-76D04B?logo=nodemon&logoColor=000" alt="Nodemon" /></a>
</div>

## What it is
A full-stack book-swapping and tracking platform: users browse and list books, request swaps, manage dashboards, and get real-time notifications for requests, approvals, and tracking updates.

## Run locally
1) Prerequisites: Node.js >= 18, npm, and MongoDB running at mongodb://127.0.0.1:27017/bookswap (default in code). Have ImageKit keys and Gmail OAuth2 creds (or adjust email transport) ready.
2) Install dependencies:
```
npm install --prefix server
npm install --prefix client
```
3) Environment variables:
	- In `server/.env`:
```
PORT=5000
JWT_SECRET=change-me
IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
IMAGEKIT_URL_ENDPOINT=...
EMAIL_USER=...
CLIENT_ID=...
CLIENT_SECRET=...
REFRESH_TOKEN=...
```
	- In `client/.env`:
```
VITE_API_BASE_URL=http://localhost:5000/api
```
4) Start backend (from project root):
```
npm run dev --prefix server
```
5) Start frontend (new terminal):
```
npm run dev --prefix client
```
6) Open the Vite dev URL (typically http://localhost:5173) and ensure the API is reachable at the base URL you configured.

## Run Server with Docker

Instead of running the server directly with npm, you can use Docker.

1) **Prerequisites**: Ensure Docker is installed and running.
2) **Navigate** to the server directory:
   ```bash
   cd server
   ```
3) **Build** the Docker image:
   ```bash
   docker build -t bookswap-server .
   ```
4) **Run** the container:
   ensure you have your `.env` file in the `server` directory with the necessary variables.
   
   *Note: If connecting to a local MongoDB on your host machine, you may need to use `host.docker.internal` instead of `localhost` or `127.0.0.1` in your `MONGO_URI`.*

   ```bash
   docker run -d -p 5000:5000 --env-file .env --name bookswap-server bookswap-server
   ```

