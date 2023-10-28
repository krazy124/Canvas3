//A simple enum that gives names instead of number to the different player states
const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
};

class State {
  //state contains the name of the current state (sitting,running,ect)
  constructor(state) {
    this.state = state;
  }
}

//each state will have it's own class that extends State
export class Sitting extends State {
  //constructor takes a reference to the player object so it can access the properties of the player class
  constructor(player) {
    //Because we are extending the class State we use the super key word which triggers the constructor of its parrent class
    super('SITTING');
    this.player = player;
  }
  //Sets a player up when the player enters a state
  enter() {
    this.player.maxFrame = 4;
    this.player.frameY = 5; //The sprite frameY where the player is sitting is 5
  }
  //Reacts to user inputs depending on the player state
  handleInput(input) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.player.setState(states.RUNNING); //Switch Player to running state if Left or Right is pressed
    } else if (input.includes('ArrowUp')) {
      this.player.setState(states.JUMPING); //Switch player jumping state if ArrowUp is pressed
    }
  }
}

export class Running extends State {
  //constructor takes a reference to the player object so it can access the properties of the player class
  constructor(player) {
    //Because we are extending the class State we use the super key word which triggers the constructor of its parrent class
    super('RUNNING');
    this.player = player;
  }
  //Sets a player up when the player enters a state
  enter() {
    this.player.maxFrame = 8;
    this.player.frameY = 3; //The sprite frameY where the player is sitting is 5
  }
  //Reacts to user inputs depending on the player state
  handleInput(input) {
    if (input.includes('ArrowDown')) {
      this.player.setState(states.SITTING);
    } else if (input.includes('ArrowUp')) {
      this.player.setState(states.JUMPING);
    }
  }
}

export class Jumping extends State {
  //constructor takes a reference to the player object so it can access the properties of the player class
  constructor(player) {
    //Because we are extending the class State we use the super key word which triggers the constructor of its parrent class
    super('JUMPING');
    this.player = player;
  }
  //Sets a player up when the player enters a state
  enter() {
    if (this.player.onGround()) this.player.vy -= 28.5; //If the player is ont he ground, begin a jump
    this.player.maxFrame = 6;
    this.player.frameY = 1; //Change the sprite image to a jumping image frame
  }
  //Reacts to user inputs depending on the player state
  handleInput(input) {
    if (this.player.vy > this.player.weight) {
      //Listens for the player to begins his descent
      this.player.setState(states.FALLING); //Change to falling state
    }
  }
}

export class Falling extends State {
  //constructor takes a reference to the player object so it can access the properties of the player class
  constructor(player) {
    //Because we are extending the class State we use the super key word which triggers the constructor of its parrent class
    super('FALLING');
    this.player = player;
  }
  //Sets a player up when the player enters a state
  enter() {
    if (this.player.onGround()) this.player.vy -= 28.5;
    this.player.maxFrame = 6;
    this.player.frameY = 2; //Changes the sprite frame to a falling image
  }
  //Reacts to user inputs depending on the player state
  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(states.RUNNING);
    }
  }
}
