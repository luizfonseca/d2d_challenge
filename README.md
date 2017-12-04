# Door2Door Challenge

- API running: http://door2door-vehicles.herokuapp.com/
- Client running: https://door2door-viewer.herokuapp.com/





![Imgur](https://i.imgur.com/V5jxI7S.jpg)




## Instructions

This project uses submodules to keep *Client* & *Server* linked
(and to not having codebases with different purposes together)

When cloning this project just use
- `git clone --recurse-submodules https://github.com/luizfonseca/d2d_challenge`

to get the latest version and the client folder.

## Setup for the Server

- `npm install`
- `npm start` in local environment to run with Refresh/Nodemon
- `npm test` to see specs for the API


## Setup for the Client

- `cd client/`
- `yarn install` to install dependencies
- `yarn start` to start
- `yarn test`


## Docker

Docker is supported using the following command (main dir):
- `docker-compose build && docker-compose up -d`

The API will run on `localhost:4000` and the client (the map) will run on `localhost:5000`. Configurations are available through `docker-compose.yml` file if you want to change anything (like the API_URL env variable for instance).


## Technical choices/observations


### MRC MVCish?
Yep. Model-Router-Controller. I only organized this way, because I find it easier to find/test specific files without having everything in one place. Also, you can look at it and know "oh, the controllers are where the action is performed".

### setInterval()?
Yeah, I actually find it good for a "MVP" version, but you see: I created an endpoint that deals with only showing the active ones; but the best (maybe) scenario would be `Socket`, because `setInterval` is always doing the request (30~80Kb) and we should actually only retrieve when the data change.
This would be something I would change in the future, if the load is increasing too much.

### Google Maps
I already used Leaflet for something similar in the past (http://lab-map.herokuapp.com/#/) using Angular/Postgres JSON/Rails and I felt that I didn't try GMaps for it yet. Both are fine.

### Markers
I was having a really hard time to decide: CIRCLE paths with Polylines or just the arrow to indicate the bearing/direction? I went with the arrow due to it being a little bit cleaner. But I did both (Polyline + Circle is commented) anyway if anybody wants to check it out. By the way, the arrow change their rotation based on the bearing!

### Marker clustering
We are using the default from Google, so even with thousands of vehicles, markers inside a Cluster are not being rendered thus the performance is still viable.

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
