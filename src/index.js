const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const port = 8080;
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

app.use(cors({
  origin: '*'
}))
app.use(express.json())     // parses requests as json

const pokemonRouter = require('./routers/pokemonRouter');
const userRouter = require('./routers/userRouter');

const {errorHandler} = require('./middleware/errorHandler')
const {userHandler} = require('./middleware/userHandler')

// middleware userHandler
app.use(userHandler)

// http//localhost:8080/pokemon
app.use('/pokemon', pokemonRouter);

// http//localhost:8080/info
app.use('/info', userRouter);

// middleware errorHandler
app.use(errorHandler);

app.use('/', express.static(path.resolve('../../front/dist'))); // serve main path as static dir
app.get('/', function(req, res) { // serve main path as static file
  res.sendFile(path.resolve('../../front/dist/index.html'))
});


// start the server
app.listen(process.env.PORT || port, () => 
  console.log("Server is running...")
);


