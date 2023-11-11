import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Rolling,
  Diving,
  Hit,
} from './playerStates.js';
import { CollisionAnimation } from './collisionAnimation.js';

//This classes job is to draw character
export class Player {
  constructor(game) {
    this.game = game; //The contrsuctor takes the expects game  as an arguement. This will give access to the games width and height ect.*/;
    this.width = 100; //The width and height are the size of each frame of the character sprite sheet
    this.height = 91.3;
    this.x = 0; //Original position of character in x and y coordinates
    this.y = this.game.height - this.height - this.game.groundMargin; //because we gave the player access to game it can access the game instances height with "this.game.height". note "This.height" represents the height of the player.
    this.vy = 0; //Vertical speed(jump speed)
    this.weight = 1;
    this.image = document.getElementById('player'); //this uses the player img form index.html
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 5; //Maximum number of frames in a row.This will chnage depending of on the state of the player
    this.fps = 25; //Frames per second
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.speed = 0; //Property for how quickly the player is moveing
    this.maxSpeed = 10; //Property that determines how many pixels the character moves per frame
    this.states = [
      //The indexes need to match the states enum at the top of playerStates.js
      new Sitting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Hit(this.game),
    ];
  }
  //Update moves arround the character based on user input
  update(input, deltaTime) {
    this.checkCollisions();
    this.currentState.handleInput(input);
    //------horizontal movement
    this.x += this.speed;
    if (input.includes('ArrowRight') && this.currentState !== this.states[6])
      this.speed = this.maxSpeed;
    // When ArrowRight is press the character will move to the right
    else if (
      input.includes('ArrowLeft') &&
      this.currentState !== this.states[6]
    )
      this.speed = -this.maxSpeed;
    //When ArrowLeft is press the character will move to the left
    else this.speed = 0; //Will reset speed to 0 if no keys are pressed
    if (this.x < 0) this.x = 0; //Prevents character from moving off canvas to left
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width; //Prevents character from moving off canvas to right
    //------vertical movement
    this.y += this.vy;
    if (!this.onGround())
      //Increases players weight until back on the ground. This will make a nice jump curve.
      this.vy += this.weight;
    else this.vy = 0; //Player is on the ground
    //-----Vertical boudaries
    if (this.y > this.game.height - this.height - this.game.groundMargin) {
      this.y = this.game.height - this.height - this.game.groundMargin;
    }
    //-----Sprite Animation area
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      //Starts the animation cycle progression. Makes the player not static. Breathes, wags tail, legs move when running ect.
      else this.frameX = 0; //Moves animation cycle back first frame
    } else {
      this.frameTimer += deltaTime;
    }
  }
  //Draw will draw the character. It needs to be passed context to specify which canvas it needs to draw on.
  draw(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    //see note A on bottomd
    context.drawImage(
      this.image, //Source image this is on the html
      this.frameX * this.width, //Frame x coordinate of the desired image
      this.frameY * this.height, //Frame y coordinate of the desired image
      this.width, //This should the width of a single frame of the sprite
      this.height, //This should the height of a single frame of the sprite
      this.x, //Starting x coordinated location on the canvas
      this.y, //Starting y coordinated location on the canvas
      this.width, //The width of the character on canvas
      this.height //The height of the character on canvas
    );
  }
  //Checks to see if the player is on the ground
  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }
  //Takes a index number from states array chnages the player current state. Then calls the enter method to change the player to that state
  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }
  checkCollisions() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true;
        this.game.collisions.push(
          new CollisionAnimation(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );
        if (
          this.currentState === this.states[4] ||
          this.currentState === this.states[5]
        ) {
          this.game.score++;
        } else {
          this.setState(6, 0);
        }
      }
    });
  }
}

/*Note A
context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
img-Specifies the image, canvas, or video element to use	 
sx-Optional. The x coordinate where to start clipping	
sy-Optional. The y coordinate where to start clipping	
swidth-Optional. The width of the clipped image	
sheight-Optional. The height of the clipped image	
x-The x coordinate where to place the image on the canvas	
y-The y coordinate where to place the image on the canvas	
width-Optional. The width of the image to use (stretch or reduce the image)	
height-Optional. The height of the image to use (stretch or reduce the image)*/
