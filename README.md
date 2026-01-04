# Reader Haven / BookSwap

## Tech Stack
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=061826)](#)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=fff)](#)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2-764ABC?logo=redux&logoColor=fff)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=fff)](#)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=fff)](#)
[![Socket.io](https://img.shields.io/badge/Socket.io-Client-010101?logo=socketdotio&logoColor=fff)](#)
[![Axios](https://img.shields.io/badge/Axios-1-5A29E4?logo=axios&logoColor=fff)](#)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=fff)](#)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=fff)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-9-47A248?logo=mongodb&logoColor=fff)](#)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=fff)](#)
[![Multer](https://img.shields.io/badge/Multer-Uploads-4B5563)](#)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-Gmail_OAuth2-2da54e?logo=maildotru&logoColor=fff)](#)
[![ImageKit](https://img.shields.io/badge/ImageKit-CDN-1f9de5)](#)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=fff)](#)
[![Nodemon](https://img.shields.io/badge/Nodemon-Dev-76D04B?logo=nodemon&logoColor=000)](#)

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
