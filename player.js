import { Sitting } from './playerStates.js';

//This classes job is to draw our character
export class Player {
  //The contrsuctor takes the expects game  as an arguement. This will give access to the games width and height ect.
  constructor(game) {
    this.game = game;
    //The width and height are the size of each frame of the character sprite sheet
    this.width = 100;
    this.height = 91.3;
    //Original position of character in x and y coordinates
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById('player');
    this.frameX = 0;
    s;
    this.frameY = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    this.states = [new Sitting(this)];
    this.currentState = this.states[0];
    this.currentState.enter();
  }
  //Update moves arround the character based on user input
  update(input) {
    //horizontal movement
    this.x += this.speed;
    if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    //vertical movement
    if (input.includes('ArrowUp') && this.onGround()) this.vy -= 30;
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
  }
  //Draw will draw the character. It needs to be passed context to specify which canvas it needs to draw on.
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y >= this.game.height - this.height;
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}
