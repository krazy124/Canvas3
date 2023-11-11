import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from './enemies.js';
import { UI } from './UI.js';

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
      this.groundMargin = 81;
      this.speed = 0;
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.player = new Player(this); //Makes a new player class instance. So when a game is created a player is created also. Because this new player class instance is inside of game class we pass Player "this" which points to the game object it is inside of.Now we have access to all of Players methods and object
      this.input = new InputHandler(this); //used from inputhandler in input.js
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.maxParticles = 200;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.fontColor = 'black';
      this.time = 0;
      this.maxTime = 45000;
      this.winningScore = 50;
      this.gameOver = false;
      this.player.currentState = this.player.states[0]; //Points to an index in this.states
      this.player.currentState.enter(); //Activates the initial default state when Player object is intialized for the first time
    }
    //Runs for every animation frame and triggers any calculations that needs to happen.
    update(deltaTime) {
      this.time += deltaTime;
      if (this.time > this.maxTime) this.gameOver = true;
      this.background.update();
      this.player.update(this.input.keys, deltaTime); //The array from input.js that keep track of the current input
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
        if (enemy.markedForDeletion)
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
      });
      //handle particles
      this.particles.forEach((particle, index) => {
        particle.update();
        if (particle.markedForDeletion) this.particles.splice(index, 1);
      });
      if (this.particles.length > this.maxParticles) {
        this.particles = this.particles.slice(0, this.maxParticles);
      }
      //Handle collisions sprites
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
        if (collision.markedForDeletion) this.collisions.splice(index, 1);
      });
    }
    //Draws all our images and scores
    draw(context) {
      this.background.draw(context);
      this.player.draw(context); //Calls Player classes draw method
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.particles.forEach((particle) => {
        particle.draw(context);
      });
      this.collisions.forEach((collision) => {
        collision.draw(context);
      });
      this.UI.draw(context);
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5)
        this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    }
  }
  //A new instance of Game class, passed a width and a height.
  const game = new Game(canvas.width, canvas.height);
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
    if (!game.gameOver) requestAnimationFrame(animate); //Creates an animation loop
  }
  //Starts things moving
  animate(0);
});
