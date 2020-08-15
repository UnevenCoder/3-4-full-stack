const express = require('express');
const config = require('./config');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const fakeHMR = require('./fake-hmr');

const compiler = webpack(webpackConfig);

const watching = compiler.watch({
  // Example watchOptions
  aggregateTimeout: 300,
  poll: undefined
}, (err, stats) => { // Stats Object
  console.log(stats.toString({
    chunks: false,  // Makes the build much quieter
    colors: true    // Shows colors in the console
  }))
  if (stats.hasErrors()) {
    console.log('didn\' t build')
    return;
  }
  console.log('built');
  fakeHMR.built();
});

const app = express();
fakeHMR.config({ app });
app.use(express.static('public'));

// require('./webpackRunner');

app.get('*', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <title>3/4 MERN TODO</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <style>
    body {
    margin:0;
    background-color: whitesmoke;
}
.Completed{
 transition: 0.5s;
 color:rgba(51,51,51,0.3);
 text-decoration:line-through;    
}
.todo-list {
    background-color: white;
    margin: auto;
    margin-top:10vh;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #efefef;
    box-shadow:
    /* The top layer shadow */
        0 1px 1px rgba(0,0,0,0.15),
            /* The second layer */
        0 10px 0 -5px #eee,
            /* The second layer shadow */
        0 10px 1px -4px rgba(0,0,0,0.15),
            /* The third layer */
        0 20px 0 -10px #eee,
            /* The third layer shadow */
        0 20px 1px -9px rgba(0,0,0,0.15);
    padding: 30px;
}
p{
word-wrap: normal;
  width:65%;
}
.todo-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 30px 20px 0;
    width: 70%;
    border-bottom: 1px solid #cecece;
    font-family: Roboto, sans-serif;
    font-weight: 300;
    font-size:3vh;
}
.undone{
    transition:0.5s;
 color:rgba(51,51,51,1.25)  ; 
}
input[type=checkbox] {
    margin-right: 10px;
    height:5vh;
}
::placeholder{text-align:center;}
button{
  text-align:center;
  color:rgba(0,0,255,0.5);
  font-size:2vh
}

.load{
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #D9D7DD;
}
button:onclick{
border:2px solid black;
  background-color:rgba(255,255,255,0.3);
}
.dot {
  display: inline-block;
  margin: 0 auto;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: .4em;
  animation-name: dots;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes dots {
  50% {
    opacity: 0;
    transform: scale(0.7) translateY(10px);
  }
}

.dot-1 {
  background-color: #4285F4;
  animation-delay: 0.2s;
}

.dot-2 {
  background-color: #DB4437;
  animation-delay: 0.4s;
}

.dot-3 {
  background-color: #F4B400;
  animation-delay: 0.6s;
}

.dot-4 {
  background-color: #0F9D58;
  animation-delay: 0.8s;
}


</style>
  </head>
  <body>
    <div id="app"/>
   
    <script src="/bundle.js" type="text/javascript"></script>
  </body>
</html>`)
});

app.listen(config.PORT, function () {
  console.log(`App currently running; navigate to localhost:${config.PORT} in a web browser.`);
});
