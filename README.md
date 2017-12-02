# Door2Door Challenge

API running: http://door2door-vehicles.herokuapp.com/
Client running: https://door2door-viewer.herokuapp.com/


## Instructions

This project uses submodules to keep *Client* & *Server* linked
(and to not having codebases with different purposes together)

When cloning this project just use:
  `git clone --recurse-submodules https://github.com/luizfonseca/d2d_challenge`
to get the latest version and the client folder.

## Setup for the Server

- `npm install`
- `npm start` in local environment to run with Refresh
- `npm test` to see specs for the API


## Setup for the Client

- `cd client/`
- `yarn install` to install dependencies
- `yarn start` to start
- `yarn test`


## Technical choices

### Node.JS
It's blazing fast, easy to develop on and works perfectly with this kind of service.

### MongoDB
I am always up to use some Postgres, but in this case I felt that the benefits of having
document-oriented database would help me more.

### Jest
It's beautiful and it's JS - so it is also helpful when developing the Front-End.
Unfortunatelly, my deadline was nearby and I couldn't write the specs for the Front-end part.

### React
Well structured framework that will allow this project (or any) to grow and still be somewhat organized.
