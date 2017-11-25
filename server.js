//server.js
const app = require('./app'),
  port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Vehicle Challenge running on port ${port}`);
})
