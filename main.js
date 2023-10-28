import { Player } from './player.js';
import { InputHandler } from './input.js';

//load events makes sure all resources are loaded and avaiable before running any code
window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  //sets canvas size
  canvas.width = 500;
  canvas.height = 500;

  //Main brain of our project. Everything will go through Game
  class Game {
    //All code inside will run when constructor is called. We can take advantage of this.
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 50;
      this.player = new Player(this); //Makes a new player class instance. So when a game is created a player is created also. Because this new player class instance is inside of game class we pass Player "this" which points to the game object it is inside of.Now we have access to all of Players methods and object
      this.input = new InputHandler(); //used from inputhandler in input.js
    }
    //Runs for every animation frame and triggers any calculations that needs to happen.
    update(deltaTime) {
      this.player.update(this.input.keys, deltaTime); //The array from input.js that keep track of the current input
    }
    //Draws all our images and scores
    draw(context) {
      this.player.draw(context); //Calls Player classes draw method
    }
  }
  //A new instance of Game class, passed a width and a height.
  const game = new Game(canvas.width, canvas.height);
  console.log(game);
  let lastTime = 0; //Helper Variable

  //Creates an animation loop that refreshes 60 times per second
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    //Clears the old paint evrytime there is updated change;
    ctx.clearRect(
      0, //starting x coordinate
      0, //starting y coordinate
      canvas.width, //ending width
      canvas.height /*ending height*/
    );
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate); //Creates an animation loop
  }
  //Starts things moving
  animate(0);
});
