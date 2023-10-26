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
    //because we gave the player access to game it can access the game instances height with "this.game.height". note "This.height" represents the height of the player.
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.weight = 1;
    //this uses the player img from index.html
    this.image = document.getElementById('player');
    this.frameX = 0;
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
    //see note A on bottom
    context.drawImage(
      this.image /*Source image this is on the html*/,
      this.frameX * this.width /*Frame x coordinate of the desired image*/,
      this.frameY * this.height /*Frame y coordinate of the desired image*/,
      this.width /*This should the width of a single frame of the sprite*/,
      this.height /*This should the height of a single frame of the sprite*/,
      this.x /*Starting x coordinated location on the canvas*/,
      this.y /*Starting y coordinated location on the canvas*/,
      this.width /*The width of the character on canvas*/,
      this.height /*The height of the character on canvas*/
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
