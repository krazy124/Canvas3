import { Sitting, Running } from './playerStates.js';

//This classes job is to draw our character
export class Player {
  constructor(game) {
    this.game = game; //The contrsuctor takes the expects game  as an arguement. This will give access to the games width and height ect.*/;
    this.width = 100; //The width and height are the size of each frame of the character sprite sheet
    this.height = 91.3;
    this.x = 0; //Original position of character in x and y coordinates
    this.y = this.game.height - this.height; //because we gave the player access to game it can access the game instances height with "this.game.height". note "This.height" represents the height of the player.
    this.vy = 0; //Vertical speed(jump speed)
    this.weight = 1;
    this.image = document.getElementById('player'); //this uses the player img form index.html
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0; //Property for how quickly the player is moveing
    this.maxSpeed = 10; //Property that determines how many pixels the character moves per frame
    this.states = [new Sitting(this), new Running(this)]; //Array of values
    this.currentState = this.states[0]; //Points to an index in this.states
    this.currentState.enter(); //Activates the initial default state when Player object is intialized for the first time
  }
  //Update moves arround the character based on user input
  update(input) {
    this.currentState.handleInput(input);
    //horizontal movement
    this.x += this.speed;
    if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
    // When ArrowRight is press the character will move to the right
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
    //When ArrowLeft is press the character will move to the left
    else this.speed = 0; //Will reset speed to 0 if no keys are pressed
    if (this.x < 0) this.x = 0; //Prevents character from moving off canvas to left
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width; //Prevents character from moving off canvas to right
    //vertical movement
    if (input.includes('ArrowUp') && this.onGround()) this.vy -= 28.5; //If player is on the ground the player jumps when ArrowUp is pressed. Notice vy is how high the player can jump.
    this.y += this.vy;
    if (!this.onGround())
      //Increases players weight until back on the ground. This will make a nice jump curve.
      this.vy += this.weight;
    else this.vy = 0; //Player is on the ground
  }
  //Draw will draw the character. It needs to be passed context to specify which canvas it needs to draw on.
  draw(context) {
    //see note A on bottom
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
    return this.y >= this.game.height - this.height;
  }
  //Takes a index number from states array chnages the player current state. Then calls the enter method to change the player to that state
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
