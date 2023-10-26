import { Player } from './player.js';
import { InputHandler } from './input.js';

/*load events makes sure all resources are loaded and avaiable before running any code*/
window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  //sets canvas size
  canvas.width = 500;
  canvas.height = 500;

  //Main brain of our project. Everything will go through this
  class Game {
    //All code in contructor will runn when it is call. We can take advantage of this.
    constructor(width, height) {
      //These are our class properties
      this.width = width;
      this.height = height;
      //Makes a new player class instance. So when a game is created a player is created also.
      //Because this new player class instance is inside of game class we pass Player "this" which points to the game object it is inside of.Now we have access to all of Players methods and object
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    //this will run for every animation frames and trigger and tigger any calculations that needs to happen.
    update() {
      this.player.update(this.input.keys);
    }
    //Will draw all our images and scores
    draw(context) {
      //We call Player classes draw method
      this.player.draw(context);
    }
  }
  //This is a new instance of Game class. It is passed a width and a height.
  const game = new Game(canvas.width, canvas.height);
  console.log(game);

  //This function creates an animation loop that refreshes 60 times per second
  function animate() {
    ctx.clearRect(
      /*This clear the old paint evrytime there is updated change*/
      0 /*starting and x coordinate*/,
      0 /*starting and y coordinate*/,
      canvas.width /*ending width*/,
      canvas.height /*ending height*/
    );
    game.update();
    game.draw(ctx); //Calls draw from class Game and passes ctx as the context
    requestAnimationFrame(animate); //This creates an animation loop
  }
  //Calls animtae function and starts things moving
  animate();
});
